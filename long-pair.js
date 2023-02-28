// Define a long chain connecting letters

class LongPair {
  constructor(x, y, InputWord) {
    this.len = 20; // Set the length of the chain
    this.word = split(InputWord, ","); // Split word into letters
    this.wordlen = this.word.length; // Define the length of the word

    // Create a list of dynamical object which displays the letters
    this.p = []; 
    for (let i = 0; i < this.wordlen; i++) {
      this.p.push(
        new Particle(x + (i-this.wordlen/2 + 1)*20, y , this.word[i])
      );
    }
    
    // Randomise initial velocity for the whole word
    let vx = random(-2, 2);
    let vy = random(-2, 2);
    for (let i = 0; i< this.wordlen; i++){
      this.p[i].body.SetLinearVelocity(new box2d.b2Vec2(vx, vy));
    }
    

    let dj = []; // Build a long chain
    for (let i = 0; i < this.wordlen - 1; i++) {
      let djd = new box2d.b2DistanceJointDef();
      // Connection between previous letter and the current one
      djd.bodyA = this.p[i].body;
      djd.bodyB = this.p[i+1].body;
      // Equilibrium length
      djd.length = scaleToWorld(this.len);

      // These properties affect how springy the joint is
      djd.frequencyHz = 0; // Try a value less than 5 (0 for no elasticity)
      djd.dampingRatio = 0;
      
      // Add a single chain to the long chain
      dj.push(world.CreateJoint(djd));
    }
  }
  
  // Initiate the killBody function of the letter
  killBody() {
    for (let i = 0; i < this.wordlen; i++) {
      this.p[i].killBody();
    }
  }

  display() {
    // Get the body's position
    for (let i = 0; i < this.wordlen; i++) {
      this.p[i].display();
    }
  }
}
