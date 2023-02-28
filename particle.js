// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Particle {
  constructor(x, y, c) {
    this.r = 10;
    this.char = c; // the letter being displayed

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);
    bd.angularDamping = 0.9;

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    //fd.shape = new box2d.b2CircleShape();
    //fd.shape.m_radius = scaleToWorld(this.r);
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(13/2), scaleToWorld(15/2));

    // Some physics
    fd.density = 100.0;
    fd.friction = 0.1;
    fd.restitution = 1;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetAngularVelocity(0);
  }

  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  // Drawing the box
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();
    

    // Draw the letter
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(255);
    noStroke();
    textFont("Helvetica");
    textSize(24);
    text(this.char, 0-7.5, 0+7.5);
    pop();
  }
}