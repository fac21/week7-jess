# Week 7 Project

Evgeny, Jo, Saki, Safia

---

### "Name My Kitty"

![](https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif)

---

## Concept 

- logged in users can upload pics :frame_with_picture: 
- any one can submit name suggestions :point_up_2:
- [stretch] Other animals, not just cats (filter by species) :monkey:
- [stretch] up-vote names :thumbsup:
- [stretch] cat-pic poster chooses name

---

### Figma Design

![](https://i.imgur.com/wj1mFeL.png)

---

![](https://i.imgur.com/h844XX6.png)

---

## Demo

![](https://i.imgur.com/DjkIbXa.png)

---

## How We Worked

Jo

---

Deployment - Safia
Facilitator - Jo
User - Evgeny
Quality - Saki

Spike: file upload :envelope_with_arrow: 

---

![heard it before](https://media.giphy.com/media/UoMBbdKskQ5N3oc7b0/giphy.gif)

---

![We launched straight in](https://media.giphy.com/media/jUJihgh1u6wP1uE9i2/giphy.gif)

---

File structure and deployment > Authentication > App content > CSS

---

![Kanban](https://i.imgur.com/CaIv1bj.png)

---

## Facilitator Role Circle

:crossed_swords: Timing breaks
:crossed_swords: Play a tune in breaks 
:heavy_check_mark: Spot checks
:heavy_check_mark: Swapping at smaller pieces of work
:crossed_swords:  Don't forget estimates! 
:heavy_check_mark: Prompt answers to questions and choose people decisively (hands up)


---

### Database setup
<!-- first- once we had an idea .as a group we created a rough schema in excel. then we split up .saki.e - server, routes, reusable html .jo/i - database folder, init,sql- connjection.j -->
Oli's [set up a basic Express + Postgres app](https://github.com/oliverjam/express-postgres-example)

**Step 1:** a) create schema in excel b) then init.sql
![](https://i.imgur.com/6kWx8TU.png)
![](https://i.imgur.com/aeUTps5.png)

---

**Step 2:** a) create script folder with files db:setup & db:build & connection.js

![](https://i.imgur.com/Y6a6ODL.png)
<!--create a new Postgres user named "exampleuser"
DB named "example"
will also copy the example.env file in this repo into a new .env file for your server to use.  -->
![](https://i.imgur.com/KSCm2Rh.png)
<!-- populate it using the schema defined in database/init.sql. -->

---

b) Add scripts to package.json
![](https://i.imgur.com/s05NNAJ.png)
- `npm run db:setup` 
- `npm run db:build` 

c)Push to github

---

**Step 3:** Individually 
a) Pull from github and `npm i`  

b) Terminal: <!--  change the permissions on each file to make them executable -->
    - ==`chmod +x ./scripts/db:setup`==& ==`chmod +x ./scripts/db:build`==
    - ==`npm run db:setup`== & ==`npm run db:build`== - repeat if changed init.sql
c) VS code:
DATABASE_URL= 'postgres://jess:123@localhost:5432/week7db' into .env

---

### File Architecture

![](https://i.imgur.com/XQGZb22.png)![](https://i.imgur.com/LGwbwoT.png)

<!-- 
- add middleware folder in src folder which include file for checkAuth and logger functions. 
- change routes to handler as they container handler functions for routes and add to src folder -->

---


### Quality: Role Circles 

- Making sure everyone has similar extensions: ie prettier so code formatting is the same
- Making sure everything is consistent. ie names are consistent (ie req/res vs request/response, function names)


---


### Technical Spike: Allow user to upload files

![](https://i.imgur.com/JcClBZN.png)


---


To create a form: 

- `<form enctype="multipart/form-data> `
- `<input type="file" id="cat_photo" name="cat_photo" required>`


---


#### Save form to database

- You need a diff type of body parser called multer to parse the data 
- Datatype for picture is bytea which allows to store binary string
- ie init.sql looks like this: picture bytea not null,


---


### Getting the image to display :tada:


![](https://i.imgur.com/hx2AjyF.png)


---


### Dynamically create a URL to actually load the image

`server.get("/cat-pic/:catid", catPic.get);`

- params need to match server URl, and url :id should not have hyphens!


---


- Function to display cat image on the dynamically created URL

```
function get(request, response) {
    const catId = request.params.catid;
    const cat = model.getCat(catId).then((cat) => {
        response.send(cat.picture);
    }).catch((error) => {
        console.error(error);
    })
}
```


---


### The image tag


`<img src="/cat-pic/${cat_img.id}" alt="" width="64" height="64">`


---


### Things we learnt


- Co-authoring - the angle brackets are really important otherwise it doesn't work (screenshots below)

![](https://i.imgur.com/WGwB0Gi.png)


---


![](https://i.imgur.com/pfXaATl.png)


---


![](https://i.imgur.com/ntc6NqA.png)


---


## Questions we answered

- How to drop user from postgres?
`drop user [username];`

- How to keep email private on github?
    - https://github.com/settings/emails
    - https://github.blog/2013-08-09-keep-your-email-private/

- How to find github email for co-authoring?
    - Use `git log`


---


### Questions we didn't answer :thinking_face: 

- should `auth.createUser` (which leads to model.createUser) actually be called something more obvious like `auth.createPassword`?

- should we use a @TODO extension in VSCode?
see https://dev.to/eclecticcoding/todo-list-in-vscode-2mnb
  
 - "Add `_` in front of unused arguments like the request argument in `login.get`". Why?


---


![](https://media.giphy.com/media/Q6yaVGg7fY8ql6FxeP/giphy.gif)
