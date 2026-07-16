import express from "express";
// import dotenv from "dotenv";
const app = express();

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "a jokes",
      content: "this is a jokes",
    },
    {id:2,
        title:"this is  second jokes",
        content:"this is my jokes"
    },  {id:3,
        title:"this is  third jokes",
        content:"this is your jokes"
    },  {id:4,
        title:"this is  Fourth jokes",
        content:"this is our jokes"
    }
  ];
  res.send("server is ready");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server a http://localhost:${port}`);
});
