//extends - is - a
//DOg is animal - > ke thua dac tinh va hanh vi
class Animal {
  eat() {
    console.log("eating");
  }
}

class Dog extends Animal {}

//has - a co 1 dung nhu nao
class Engine {
  start() {
    console.log("no may");
  }

  stop() {
    console.log("duing may");
  }
}

class Car {
  //car chứa động cơ - > dùng như công cụ bên trong class
  private engine = new Engine();

  drive() {
    this.engine.start();
    console.log("driving");
  }
}
const car = new Car();
car.drive();

//vấn đề 1: Đa kết thừa - Con vừa muốn gióngc ha A, vuiawf muốn giống B
class FlyingAnimal extends Animal {
  fly() {
    console.log("flying");
  }
}
class SwinmmingAnimal extends Animal {
  swimming() {
    console.log("swimming");
  }
}

//Tôi muốn dùng vịt vừa biết bay vừa biết bơi
// class Duck extends FlyingAnimal, S
//Vấn đề 2: Tight coupling - Bị lệ thuộc chặt vào cha < sửa cha , con chết theo

class BaseTest2 {
  setup() {
    console.log("opening browser...");
    //ngay b
    ///team muon thang setup nhan them 1 tham so vi du la env. de setup theo moi truong
    //setup(env:string) -> TAT CA CLASS CON OVERRIDE DEU PHAI SUA THEO ->
  }
}

class LoginTest2 extends BaseTest2 {
  setup() {
    super.setup();
    console.log("abc");
  }
}

//Vấn dề 3: Override lỡ tay, -. cha gẫy
//class cha có 1 method gọi nhiều method con -> class con override 1 mthod nhưng quên gọi super, làm dứgt chuôi logic cua cha
//ma compile vẫn ok _>

abstract class BaseTest3 {
  async run(): Promise<void> {
    console.log(`Running ${this.getTestName()}`);
    this.setup();
    await this.execute();
    this.teardown();
  }
  setup(): void {
    console.log("khoi tao browser");
    console.log("khoi tao context");
    console.log("auth token load");
  }
  teardown(): void {
    console.log("browser dong");
  }

  abstract getTestName(): string;
  abstract execute(): Promise<void>;
}
class LoginTest3 extends BaseTest3 {
  getTestName(): string {
    return "Login test";
  }

  //override setup de them buoc login truoc
  //
  setup(): void {
    // super.setup();
    console.log("Pre login. set auth cookie");
  }

  async execute(): Promise<void> {
    console.log("fill username;");
    //await page.fill()
    //page nay underfinded
    //thuc te se fail -> boi vi chung ta se ko co browser (hay trinh duyet de chay boi vi thieu buoc
    // setup tu thang cha
  }
}

async function runtest() {
  const test = new LoginTest3();
  await test.run();
}

//composition se ly ngon - vi ko co super, ko co override, ko co ke thua. moi module doc lap ro rahng

// interface Flyable {
//   fly(): void;
// }
// interface Swimmable {
//   swim(): void;
// }

// class Duck implements Flyable, Swimmable {
//   fly(): void {}
// }

//giai quyet bang composition
//Đa kế thừa : Duck vừa chứa khả năng biết bay và bơi (bao nhiêu module cũng đc)
//Tight coupling: _. Sửa flyabiblity -> chỉ ảnh hưởng tới fly -> ko ảnh hưởngt tới duck hay flyAbility
//ko có override -> ko lo lỡ tay phá code của cha
class FlyAbility {
  fly() {
    console.log("flying");
  }
}

class SwimAbility {
  swimming() {
    console.log("swimming");
  }
}

class Duck {
  private flyAbility = new FlyAbility();
  private swim = new SwimAbility();

  fly() {
    this.flyAbility.fly();
  }
}

class Eagle {
  private fly = new FlyAbility();
}
