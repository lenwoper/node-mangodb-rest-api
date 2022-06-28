module.exports = mongoose =>{
  var schema = mongoose.Schema(
    {
      name:String,
      father_name:String,
      mother_name:String,
      dob:String,
      age:String,
      roll_number:Number,
      grade:String,
      percentage:String,
      address:String,
      result:Boolean,
      otherData:[
        {
          schoolership:Boolean,

        }
      ],
      published:Boolean,
    },{
      timestamps:true
    }
  );
  schema.method("toJSON", function(){
    const {__v , _id , ...object} = this.toObject();
    object.id = _id;
    return object;
  });

  const student = mongoose.model('student' , schema);
  return student;
}