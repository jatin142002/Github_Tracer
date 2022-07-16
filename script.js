import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";

let reposName = [];
let reposLink = [];

Scrap("https://github.com/HimanShu0923?tab=repositories");

function Scrap(url){
    request(url , (error, response, html)=>{
        if(error)
        {
            console.log(chalk.red("Error : "+error));
        }
        else
        {
            console.log(chalk.yellow("Status Code : "+response.statusCode));
            handleHTML(html);
        }
    })

    for(let i=0 ; i<reposName.length ; i++)
    {
        console.log(chalk.bgBlackBright(reposName[i]+" - "+reposLink[i]));
    }
}

function handleHTML(html)
{
    const $ = cheerio.load(html);

    const repos = $("a[itemprop='name codeRepository']");

    for(let i=0 ; i<repos.length ; i++)
    {
        console.log($(repos[i]).text().trim());
        reposName.push($(repos[i]).text().trim());

        console.log($(repos[i]).attr("href"));
        reposLink.push("https://github.com/"+$(repos[i]).attr("href"));
    }
}

export default Scrap;