import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

  res.render("home");

});

app.post("/", async function(req, res){

    const githublink = "https://github.com/" + req.body.Github_ID + "?tab=repositories" ;

    console.log(req.body.Github_ID);

    Scrap(githublink, req.body.Github_ID , res);
    
});

app.listen(5000, function () {
  console.log("Server started on port 5000");
});



// ---------> SCRAPPING is done here <--------------------------

function Scrap(url , userID , res){

    request(url , (error, response, html)=>{
        if(error)
        {
            console.log(chalk.red("Error : "+error));
        }
        else
        {
            console.log(chalk.yellow("Status Code : "+response.statusCode));
            handleHTML(html , userID , res);
        }
    })
  
    // console.log(repos);
    // return repos;  
}

function handleHTML(html , userID , res)
{
    const $ = cheerio.load(html);

    const repos = $("a[itemprop='name codeRepository']");

    let repos1 = [];

    for(let i=0 ; i<repos.length ; i++)
    {
        console.log(chalk.bgBlackBright($(repos[i]).text().trim()));
        let repoName = $(repos[i]).text().trim();

        console.log($(repos[i]).attr("href"));
        let repoLink = "https://github.com"+$(repos[i]).attr("href");

        const repo = {
            name: repoName,
            link: repoLink
        }
        repos1.push(repo);
    }

    console.log(repos1);
    res.render("repos", {userID: userID , userRepos: repos1});
    // return repos1;
 
}
