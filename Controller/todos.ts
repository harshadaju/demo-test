import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DATA_API_KEY, APP_ID } = config();


const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/beta/action`;
const DATA_SOURCE = "DenoApp";
const DATABASE = "TodoApp";
const COLLECTION = "todos";

const option = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DATA_API_KEY,
  },
  body: "",
};

const addTodo = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data found"
      };
      return;
    } else {
      const body = await request.body();
      const todo = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: todo
      };
      option.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, option);
      const { instertedId } = await dataResponse.json();
      response.status = 200;
      response.body = {
        success: true,
        message: "Todo added successfully",
        data: todo,
        instertedId
      };
    }
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.body = {
      success: false,
      message: error.message,
      error: error.stack,
    };
  }
};

const getTodos = async ({response}: {response: any}) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    option.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, option);
    const  result  = await dataResponse.json();
    if(result){
      response.status = 200;
      response.body = {
        success: true,
        message: "Todos fetched successfully",
        data: result,
      };
    }else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.body = {
      success: false,
      message: error.message,
      error: error.stack,
    };
  }
};

const getTodo= async ({params,response}: {params:{id:string},response:any}) => {
  try {
    const URI = `${BASE_URI}/findOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: {_id: parseInt(params.id)}
    };
    option.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, option);
    const  result  = await dataResponse.json();
    if(result){
      response.status = 200;
      response.body = {
        success: true,
        message: "Todo fetched successfully",
        data: result,
      };
    }else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.body = {
      success: false,
      message: error.message,
      error: error.stack,
    };
  }
};

const updateTodo = async ({request,response,params}: {request: any, response: any,params:{id:string}}) => {
  console.log("Message from updateTodo",params.id);
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data found"
      };
      return;
    } else {
      const body = await request.body();
      const todo = await body.value;
      const URI = `${BASE_URI}/updateOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        filter: { _id: parseInt(params.id) },
        update:{$set: todo}
      };
      option.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, option);
      const todoUpdated = await dataResponse.json();
      response.status = 200;
      response.body = {
        success: true,
        message: "Todo updated successfully",
        todoUpdated
      };
    }   
  }
  catch (error) {
    console.log(error);
    response.status = 500;
    response.body = {
      success: false,
      message: error.message
    };
  }
};
export { addTodo , getTodos, getTodo, updateTodo};