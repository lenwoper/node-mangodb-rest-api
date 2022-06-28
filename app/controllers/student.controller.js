const db = require('../modals');
const students = db.students;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ messege: "conett can not be empty |" })
    return;
  }
  const student = new students({
    name: req.body.name,
    father_name: req.body.father_name,
    mother_name: req.body.mother_name,
    dob: req.body.dob,
    age: req.body.age,
    grade: req.body.grade,
    percentage: req.body.percentage,
    address: req.body.address,
    result: req.body.result,
    otherData: [
      {
        schoolership: req.body.schoolership,
      }
    ],
    published: req.body.published ? req.body.published : false,

  })

  student.save(student).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({ messege: "Post erro has been occured ", e });
  });
};
exports.findAll = (req, res) => {

  const name = req.query.name;
  var condition = name ? { name: { name: new RegExp(name), $options: "i" } } : {};
  students.find(condition).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ messege: err.message || 'soem error as been occured to fetching all data from the data base ' });
  });
};
// find by id here 
exports.findOne = (req, res) => {
  const id = req.body.id;
  student.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "did not find this data " });
    } else {
      res.send(data);
    }
  }).catch(err => {
    es.status(500).send({ messege: "unabel to fetch  this id data ", err })
  });
};

exports.update = (req, res) => {
  if (!res.body) {
    return res.status(404).send({
      message: "data upaditing can not be empty here "
    });
  }
  const id = req.params.id;
  students.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {

    if (!data) {
      res.status(404).send({ message: "data ahs been changed here " });

    } else {
      res.send({ message: "given id data has been chnaged " });
    }

  }).catch((err) => {
    res.status(500).send({ messege: "Error has been occured !  did not chnaged the given id data ", err })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  student.findByIAndRemove(id, { useFindAndModify: true }).
    then(data => {
      if (!data) {
        res.status(404).send({ message: "did not find this id pleasae try again " });
      }
      else {
        res.send({
          messege: "given id has been removed from the data base "
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "could not delter this data from  the db"
      })
    })
}

exports.deleteAll = (req, res) => {
  students.deleteMany({}).then((data) => {
    res.send({ message: "data  has been changed please ry again " });
  }).catch(err => {
    res.status(500).send({ message: "error has been occured here " });
  })
}