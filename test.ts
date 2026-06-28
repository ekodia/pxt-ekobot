// tests go here; this will not be compiled when this package is used as a library

//PWM fast decay control motor A forward and set speed
Ekodia.PWMFast(Motor.A, 0);

//Coast motor
Ekodia.Coast(Motor.A);

//Brake motor
Ekodia.Brake(Motor.A);
