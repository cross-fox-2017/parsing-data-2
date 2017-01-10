"use strict"
const fs = require('fs')
const faker = require('faker')
const yaml = require('js-yaml')

class Person {
  constructor(id, firstName, lastName, email, phone){
    this.id = id,
    this.firstName = firstName,
    this.lastName = lastName,
    this.email = email,
    this.phone = phone,
    this.createdAt = new Date()
  }
}
class PersonParser {
  constructor(file) {
    this._file = fs.readFileSync(file, 'utf8');
    this._name = file;
    this._people = null;
    this.parsedFile = [];
    this.preSavedData = []
  }
  parseFile(){
    let result = []
    this._file = this._file.split("\n")
    this._file.forEach(function(data){
      data = data.split("\n");
        data.forEach(function(val){
          val = val.split(",")
          let ini = {
            id : val[0],
            firstName : val[1],
            lastName : val[2],
            email : val[3],
            phone : val[4],
            createdAt : new Date (val[5])
          }
          result.push(ini);
        });
    });
    return this.parsedFile = result;
  }
  get people(){
    return this.parsedFile;
  }
  get file(){
    return this._name;
  }
  addPerson(id, firstName, lastName, email, phone) {
    this.parsedFile.push(new Person(id, firstName, lastName, email, phone));
  }
  formatToString(){
    for (let i = 0; i < this.parsedFile.length; i++){
      this.preSavedData.push(
        this.parsedFile[i].id + "," +
        this.parsedFile[i].firstName + "," +
        this.parsedFile[i].lastName + "," +
        this.parsedFile[i].email + "," +
        this.parsedFile[i].phone + "," +
        new Date(this.parsedFile[i].createdAt) + "\n"
      )
    }
  }
  saveCsv(){
    fs.writeFileSync('new-people.csv', this.preSavedData);
  }
  save_as_yaml(){
    let yamled = yaml.dump(this.preSavedData);
    fs.writeFileSync('new-people.yaml', yamled);
  }
  save_as_json(){
    let jsoned = this.parsedFile.slice(1)
    fs.writeFileSync('new-people.json', JSON.stringify(jsoned));
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.parseFile());
parser.people;
parser.addPerson(201, faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumber());
parser.formatToString()
parser.saveCsv();
parser.save_as_yaml()
parser.save_as_json()
console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
