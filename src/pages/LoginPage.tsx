import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonInput,
  IonText,
  IonButton,
  IonItem,
  IonLoading,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth as firebaseAuth, authObject } from '../firebase';

let appverifier;

const LoginPage: React.FC = () => {
  const { loggedIn }  = useAuth();
  const [mobileNo, setMobileNo] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState({loading: false, error: false});
  const [errorText ,setErrorText] = useState('');
  const [showBtn, setShowBtn] = useState({send: true, verify: false});
  const [confirmationResult, setConfirmationResult] = useState<firebase.auth.ConfirmationResult>();
  const [enableResend, setEnableResend] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log("Appverifier");
    appverifier= new authObject.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function() {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
        console.log("captcha solved");
        setShowBtn({send: false, verify: true});
        setStatus({loading:false, error: false});
      }
    });
  },[loggedIn]);

  const handleVerify = () =>{
    setStatus({loading:true, error: false});
    if(mobileNo.length != 10)
    {
      setErrorText('Enter 10 digit mobile number.');
      setStatus({loading:false, error: true});
    }
    else if(!isPhoneNumberValid())
    {
      setErrorText('Enter valid mobile number');
      setStatus({loading:false, error: true});
    }
    else
    {
      if(appverifier != null)
      {
        firebaseAuth.signInWithPhoneNumber(`+91${mobileNo}`, appverifier)
          .then(function(confirmationResult) {
            setConfirmationResult(confirmationResult);
            setShowBtn({send: false, verify: true});
            setStatus({loading:false, error: false});
            setIsActive(true);
          })
          .catch(function(error) {
            setErrorText(error.message);
            setStatus({loading:false, error: true});
          });
      }
      else
      {
        setErrorText('Captcha Issue');
        setStatus({loading:false, error: true});
      }
    }
  };

  const handleLogin = () => {
    if(code.length === 6)
    {
      setStatus({loading:true, error: false}); 
      confirmationResult.confirm(code).then(function () {
        //window.location.reload;
        returnHome();    
      }).catch(function () {
        // User couldn't sign in (bad verification code?)
        setErrorText("Invalid Code");
        setStatus({loading:false, error: true});         
      });
    }
    else 
    {
      setErrorText('Enter 6 digit code');
      setStatus({loading:false, error: true});
    }
  };

  function isPhoneNumberValid() {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = `+91${mobileNo}`;
    return phoneNumber.search(pattern) !== -1;
  }
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    else if (isActive && seconds === 0)
    {
      setIsActive(false);
      setEnableResend(true);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleResend = () =>{
    window.location.reload();
  };
  const returnHome = ()=>{
    //return <Redirect to="/my/home" />
    window.location.reload();
  }
  if(loggedIn)
  {
    return <Redirect to="/my/home" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enter your Phone Number</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        {showBtn.send &&
          <IonItem>
            <IonLabel position="floating">Mobile Number *</IonLabel>
            <IonInput type="tel" value={mobileNo} onIonChange={(event) => setMobileNo(event.detail.value)}></IonInput>
          </IonItem>
        }  
        {showBtn.verify &&
          <IonItem>
            <IonLabel position="floating">6-digit code</IonLabel>
            <IonInput type="number" max="6" value={code} onIonChange={(event) => setCode(event.detail.value)}></IonInput>
          </IonItem>
        }
        { status.error &&
          <IonText color="danger" >{errorText}</IonText>
        }
        </IonList>
        
        <IonLoading isOpen={status.loading} />
        {showBtn.send &&
          <IonButton expand="block" id="sign-in-button" onClick={handleVerify}>Send</IonButton>
        }       
        {showBtn.verify &&
          <section>
            <IonButton expand="block" onClick={handleLogin}>verify</IonButton>
            {enableResend &&
              <IonButton expand="block" onClick={handleResend}>Resend</IonButton>
            }
            {isActive &&
              <IonText>Resend Code in {seconds} sec</IonText>
            }   
          </section>
        } 
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
