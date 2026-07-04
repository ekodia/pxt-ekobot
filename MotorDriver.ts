enum Motor {
  //% block="A"
  A = 0x1,
  //% block="B"
  B = 0x2,
}

//% weight=20 color=#3333FF icon="\uf2db" block="Ekodia"
namespace Ekodia {
  const PWMA1 = AnalogPin.P13;
  const PWMA2 = AnalogPin.P12;
  const A1 = DigitalPin.P13;
  const A2 = DigitalPin.P12;
  const PWMB1 = AnalogPin.P16;
  const PWMB2 = AnalogPin.P15;
  const B1 = DigitalPin.P16;
  const B2 = DigitalPin.P15;

  const PWMPeriod = 10000;

  /**
   * Démarrer le moteur avec la vitesse enregistrée.
   */
  //% blockId=Ekodia_Start block="régler Moteur %m|à %speed"
  //% weight=90
  //% speed.min=-1023 speed.max=1023
  export function demarrer(m: Motor, speed: number): void {
    appliquer(m, speed);
  }

  /**
   * Arrêter le moteur (roue libre).
   */
  //% blockId=Ekodia_Stop block="arrêter Moteur %m"
  //% weight=80
  export function arreter(m: Motor): void {
    appliquer(m, 0);
  }

  // Fonction interne : applique une vitesse aux broches (décroissance rapide)
  function appliquer(m: Motor, speed: number): void {
    const amp = Math.abs(speed);

    if (m == Motor.A) {
      if (speed > 0) {
        pins.analogWritePin(PWMA1, amp);
        pins.analogSetPeriod(PWMA1, PWMPeriod);
        pins.digitalWritePin(A2, 0);
      } else if (speed < 0) {
        pins.digitalWritePin(A1, 0);
        pins.analogWritePin(PWMA2, amp);
        pins.analogSetPeriod(PWMA2, PWMPeriod);
      } else {
        pins.digitalWritePin(A1, 0);
        pins.digitalWritePin(A2, 0);
      }
    } else {
      if (speed > 0) {
        pins.analogWritePin(PWMB1, amp);
        pins.analogSetPeriod(PWMB1, PWMPeriod);
        pins.digitalWritePin(B2, 0);
      } else if (speed < 0) {
        pins.digitalWritePin(B1, 0);
        pins.analogWritePin(PWMB2, amp);
        pins.analogSetPeriod(PWMB2, PWMPeriod);
      } else {
        pins.digitalWritePin(B1, 0);
        pins.digitalWritePin(B2, 0);
      }
    }
  }
}
