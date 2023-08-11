const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/data" )


const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createPerson = (done) => {
const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Tacos", "Burger"]
    });

    person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

const findPeopleByName = (name, done) => {
    Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

const findOnePersonByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

const findAndUpdatePerson = (personId, done) => {
    Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("Hamburger");
    person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
    });
    });
};

const findAndUpdateByName = (personName, done) => {
    Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
    }
);
};

const findAndRemovePerson = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
    });
};

const removePeople = (done) => {
    Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
    });
};

const queryChain = (done) => {
    Person.find({ favoriteFoods: "Burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

module.exports = {
    createPerson,
    createManyPeople,
    findPeopleByName,
    findOnePersonByFood,
    findPersonById,
    findAndUpdatePerson,
    findAndUpdateByName,
    findAndRemovePerson,
    removePeople,
    queryChain
};
