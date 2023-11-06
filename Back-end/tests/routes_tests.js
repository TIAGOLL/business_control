const supertest = require("supertest");
const crypto = require("crypto");
const routes = require("../src/routes.js");

describe("Testando retorno das rotas de API", ()=> {
  it("GET /users experando code 200 ", (done)=> {
    supertest(routes)
      .get("/products")
      .send({

      })
      .expect(200)
      .end(function(err, res){
        if(err){
          done(err)
        }else{
          done()
        }
      });
  });
  // it("POST /users esperando code 200 ", (done)=> {
  //   supertest(server)
  //     .post("/users")
  //     .send({
  //       _name:"usuario",
  //       _password:"senha235"
  //     })
  //    .expect(200)
  //    .end(function(err, res){
  //       if(err){
  //        done(err)
  //       }else{
  //        done()
  //       }
  //     });
  // });
  // it("DELETE /users esperando code 200 ", (done)=> {
  //   supertest(server)
  //     .delete("/users/"+crypto.randomBytes(12).toString('hex'))
  //     .send({

  //     })
  //     .expect(200)
  //     .end(function(err, res){
  //       if(err){
  //         done(err)
  //       }else{
  //         done()
  //       }
  //     });
  // });

});
