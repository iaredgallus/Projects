// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

/*
Creates a P. Aequor Object.
Properties: specimenNum (int); dna (array of char).
Methods:
- mutate (changes one char at random in dna array); 
- compareDNA (takes another pAequor object as first parameter; prints % of dna overlap if 1 is entered as optional second parameter; returns int representing % of dna shared); 
- willLikelySurvive (determines whether specimen is likely to survive, i.e. 60% or more of its dna array is 'C' or 'G'; returns true if likely, false if unlikely).
*/
function pAequorFactory (number, dnaArray) {
  return {
    specimenNum: number,
    dna: dnaArray,
    mutate() {
      let base = Math.floor(Math.random() * this.dna.length);
      //console.log(base);
      let newBase = this.dna[base];
      //console.log('New base: ', newBase, ' | dna[base]: ', this.dna[base]);
      while (this.dna[base] === newBase) {
        newBase = returnRandBase();
        //console.log('New base: ', newBase);
      }
      this.dna[base] = newBase;
      return this.dna;
    },
    compareDNA(pAequor, print) {
      let same = 0;
      for (i in pAequor.dna) {
        if (pAequor.dna[i] === this.dna[i]) {
          same++;
        }
      }
      same = Math.round(same/15*100);
      if (print === 1) {
        console.log(`Specimen #${this.specimenNum} and Specimen #${pAequor.specimenNum} have ${same}% DNA in common.`);
      }
      return same;
    },
    willLikelySurvive() {
      let cg = 0;
      for (element of this.dna) {
        if (element === 'C' || element === 'G') {
          cg++;
        }
      }
      cg = cg/15*100;
      //console.log(Math.round(cg) + '% chance of survival.');
      if (cg >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      let complement = [];
      //console.log(this.dna);
      for (e of this.dna) {
        //console.log(e);
        switch (e) {
          case 'A': complement.push('T'); break;
          case 'T': complement.push('A'); break;
          case 'C': complement.push('G'); break;
          case 'G': complement.push('C'); break;
        }
      }
      return complement;
    }
  }
}

// Creates an array of 30 p. Aequor objects all of which are likely to survive (i.e. 60% chance or higher of survival).
function createSurvive30() {
  let survivors = [];
  numSurvive = 0;
  specimenNum = 1;
  while (numSurvive <= 30) {
    let newObject = pAequorFactory(specimenNum, mockUpStrand());
    if (newObject.willLikelySurvive()) {
      survivors.push(newObject);
      numSurvive++;
    }
    specimenNum++;
  }
  return survivors;
}


// Prints a message that indicates which two specimens are most closely related and what % of DNA they share.
function findClosestDNA(pAequorArray) {
  let highestMatch = 0;
  let relatedE;
  let relatedF;
  for (e of pAequorArray) {
    //console.log(e.specimenNum, e.willLikelySurvive());
    for (f of pAequorArray) {
      if (e !== f) {
        if (e.compareDNA(f) > highestMatch) {
          highestMatch = e.compareDNA(f);
          relatedE = e.specimenNum;
          relatedF = f.specimenNum;
        }
      }
    }
  }
  console.log(`Specimen #${relatedE} and Specimen #${relatedF} are the closest genetic match at ${highestMatch}%.`)
}




let array1 = mockUpStrand();
let array2 = mockUpStrand();
//console.log(array1);
//console.log(array2);
let object1 = pAequorFactory(1, array1);
let object2 = pAequorFactory(2, array2);
/*
object1.compareDNA(object2);
object2.compareDNA(object1);
object1.compareDNA(object1);
*/
//console.log(object1);
//object1.mutate();
//console.log(object1);
//console.log(object1.willLikelySurvive());
//console.log(object2.willLikelySurvive());

let instances30 = createSurvive30();
let i0 = instances30[0];
let i1 = instances30[1];
//let compare1 = i0.compareDNA(i1);
let compare2 = i0.compareDNA(i1, 1);
//console.log(compare1, compare2);
findClosestDNA(instances30);
console.log(i1.dna);
console.log(i1.complementStrand());
