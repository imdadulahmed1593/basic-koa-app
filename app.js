const koa = require("koa");
const json = require("koa-json");
const koaRouter = require("koa-router");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");
const path = require("path");

const app = new koa();
const router = new koaRouter();

// replace with DB
const movies = [
  "Breaking Bad",
  "Game of Thrones",
  "The Walking Dead",
  "The House of Dragons",
];

// json middleware
app.use(json());

// bodyparser middlewar
app.use(bodyParser());

// router middleware
app.use(router.routes()).use(router.allowedMethods());

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

// routes
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

// list of things
async function index(ctx) {
  await ctx.render("index", {
    title: "Movies I love!",
    movies: movies,
  });
}

// show add page
async function showAdd(ctx) {
  await ctx.render("add");
}

// add movie
async function add(ctx) {
  const body = ctx.request.body;
  movies.push(body.movie);
  ctx.redirect("/");
}

router.get("/test", (ctx) => (ctx.body = "hello world"));

app.listen(3000, () => console.log("server started..."));
