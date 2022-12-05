import * as THREE from 'three';

import Key from './Key';

export default class Piano {
  constructor() {
    this.flatKeys = [
      new Key('Db3', '2', 5),
      new Key('Eb3', '3', 15),
      new Key('Gb3', '5', 35),
      new Key('Ab3', '6', 45),
      new Key('Bb3', '7', 55),

      new Key('Db4', 's', 75),
      new Key('Eb4', 'd', 85),
      new Key('Gb4', 'g', 105),
      new Key('Ab4', 'h', 115),
      new Key('Bb4', 'j', 125),
    ];

    this.naturalKeys = [
      new Key('C3', 'q', 0),
      new Key('D3', 'w', 10),
      new Key('E3', 'e', 20),
      new Key('F3', 'r', 30),
      new Key('G3', 't', 40),
      new Key('A3', 'y', 50),
      new Key('B3', 'u', 60),

      new Key('C4', 'z', 70),
      new Key('D4', 'x', 80),
      new Key('E4', 'c', 90),
      new Key('F4', 'v', 100),
      new Key('G4', 'b', 110),
      new Key('A4', 'n', 120),
      new Key('B4', 'm', 130),
    ];

    this.displayText = true;
    this.highlightColor = '#61DBFB';

    this.pianoGroup = new THREE.Group();
    this.pianoGroup.position.x = -65;
    this.pianoGroup.rotation.x = -Math.PI / 4;
    this.pianoGroup.add(
      ...this.flatKeys.map((key) => key.keyGroup),
      ...this.naturalKeys.map((key) => key.keyGroup)
    );
  }

  hideText() {
    this.naturalKeys.forEach((key) => {
      key.hideKeyText();
    });
  }

  renderText(font) {
    this.naturalKeys.forEach((key) => {
      key.renderKeyText(font);
    });
  }

  getPianoGroup() {
    return this.pianoGroup;
  }

  getKeyFromInput(inputKey) {
    const flatKey = this.flatKeys.find((k) => k.inputKey === inputKey);
    const naturalKey = this.naturalKeys.find((k) => k.inputKey === inputKey);
    return flatKey || naturalKey || undefined;
  }

  maybePlayNote(eventKey) {
    const key = this.getKeyFromInput(eventKey);
    if (key !== undefined) {
      key.play(this.highlightColor);
    }
  }

  maybeStopPlayingNote(eventKey) {
    const key = this.getKeyFromInput(eventKey);
    if (key !== undefined) {
      key.stopPlaying();
    }
  }
}
