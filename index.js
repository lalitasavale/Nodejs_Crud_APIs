import express from 'express';

const port = 3000;

const app = express();

let teaData =[];
let teaId =1;

app.use(express.json())


//  add new tea
app.post('/teas', (req,res)=>{
    const {name, price} = req.body
    let newTea = {id:teaId++, name,price}
    teaData.push(newTea)

    res.status(201).send('Tea added successfully')
})

// get all tea list
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

// get tea by id
app.get('/teas/:id',(req,res)=>{
    let tea = teaData.find(t=>t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    return res.status(200).send(tea)
})


// update tea info
app.put('/teas/:id', (req, res)=>{
   let tea = teaData.find(t=> t.id === parseInt(req.params.id));
   if( !tea){
    return res.status(404).send('tea not found to update')
   }
   const {name, price} = req.body
   tea.name = name;
   tea.price = price;

   res.status(200).send('Tea info updated successfully')

})

// delete tea by id

app.delete('/teas/:id', (req,res)=>{

    const index = teaData.findIndex(t=> t.id === parseInt(req.params.id));

    if(index === -1){
        return res.status(404).send('Tea not found to delete')
    }

    teaData.splice(index, 1)
    return res.status(200).send('Tea Info delete Successfully')

})

app.listen(port,(req,res)=>{
    console.log(`Server is listening on ${port}...`)
})

app.get('/',(req,res)=>{
    res.send('Hello from lalata savele');
})
