let studentData= (req,res)=>{
    let jokes = [
        {
            id:1,
            title:'jokes',
            jokes:"this is first joke"
        },
        {
            id:2,
             title:'jokes',
            jokes:"this is second joke"
        }
    ]
    res.send(jokes)
}
export default studentData;