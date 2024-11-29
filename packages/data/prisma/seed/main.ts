import { PrismaClient, UserType } from "@prisma/client";
import { MathUtils } from "my-website.common/utils/MathUtils.js";
import { HashUtils } from "my-website.common/utils/HashUtils.js";

const hashUtils = new HashUtils();

export async function seedUser(prisma: PrismaClient) {
  await prisma.user.upsert({
    where: { email: "salman.k3001@gmail.com" },
    update: {},
    create: {
      fullName: "Salman Khan",
      email: "salman.k3001@gmail.com",
      userName: "Salman",
      password: hashUtils.hash("Salman@19918888"),
      emailVerified: true,
      userType: UserType.Admin,
      isActive: true,
      profile: {
        create: {},
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "testuser@gmail.com" },
    update: {},
    create: {
      fullName: "Test User",
      email: "testuser@gmail.com",
      userName: "TestUser" + MathUtils.getRandom6number(),
      password: hashUtils.hash("user@19918888"),
      emailVerified: true,
      userType: UserType.User,
      isActive: true,
      profile: {
        create: {},
      },
    },
  });
}

export async function seedBlogCategories(prisma: PrismaClient) {
  await prisma.blogCategory.upsert({
    where: { id: "tutorials" },
    update: {},
    create: {
      id: "tutorials",
      name: "Tutorials",
      desc: "Contains the tutorial articals on various topics.",
    },
  });

  await prisma.blogCategory.upsert({
    where: { id: "blogs" },
    update: {},
    create: {
      id: "blogs",
      name: "Blogs",
      desc: "General blog posts from codetrack.",
    },
  });

  await prisma.blogCategory.upsert({
    where: { id: "documentation" },
    update: {},
    create: {
      id: "documentation",
      name: "documentation",
      desc: "Contains documentations or instructions, workflows",
    },
  });

  await prisma.blogCategory.upsert({
    where: { id: "cheatsheets" },
    update: {},
    create: {
      id: "cheatsheets",
      name: "Cheatsheets",
      desc: "Contains cheatsheets for common tasks in the world of coding.",
    },
  });
}

export async function seedTags(prisma: PrismaClient) {
  await prisma.tag.upsert({
    where: { id: "vue-js" },
    update: {},
    create: {
      id: "vue-js",
      name: "Vue js",
    },
  });

  await prisma.tag.upsert({
    where: { id: "react" },
    update: {},
    create: {
      id: "react",
      name: "React",
    },
  });

  await prisma.tag.upsert({
    where: { id: "node-js" },
    update: {},
    create: {
      id: "node-js",
      name: "Node Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "express-js" },
    update: {},
    create: {
      id: "express-js",
      name: "Express Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "nest-js" },
    update: {},
    create: {
      id: "nest-js",
      name: "Nest Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "adonis-js" },
    update: {},
    create: {
      id: "adonis-js",
      name: "Adonis Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "astro-js" },
    update: {},
    create: {
      id: "astro-js",
      name: "Astro Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "nuxt-js" },
    update: {},
    create: {
      id: "nuxt-js",
      name: "Nuxt Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "next-js" },
    update: {},
    create: {
      id: "next-js",
      name: "Next Js",
    },
  });
  await prisma.tag.upsert({
    where: { id: "docker" },
    update: {},
    create: {
      id: "docker",
      name: "Docker",
    },
  });
  await prisma.tag.upsert({
    where: { id: "redis" },
    update: {},
    create: {
      id: "redis",
      name: "Redis",
    },
  });
  await prisma.tag.upsert({
    where: { id: "vuetify" },
    update: {},
    create: {
      id: "vuetify",
      name: "Vuetify",
    },
  });
  await prisma.tag.upsert({
    where: { id: "tailwind" },
    update: {},
    create: {
      id: "tailwind",
      name: "Tailwind",
    },
  });
  await prisma.tag.upsert({
    where: { id: "dotnet" },
    update: {},
    create: {
      id: "dotnet",
      name: "Dotnet",
    },
  });
  await prisma.tag.upsert({
    where: { id: "c" },
    update: {},
    create: {
      id: "c",
      name: "C#",
    },
  });
  await prisma.tag.upsert({
    where: { id: "javascript" },
    update: {},
    create: {
      id: "javascript",
      name: "Javascript",
    },
  });
  await prisma.tag.upsert({
    where: { id: "typescript" },
    update: {},
    create: {
      id: "typescript",
      name: "Typescript",
    },
  });
  await prisma.tag.upsert({
    where: { id: "payments" },
    update: {},
    create: {
      id: "payments",
      name: "Payments",
    },
  });
  await prisma.tag.upsert({
    where: { id: "realtime" },
    update: {},
    create: {
      id: "realtime",
      name: "Realtime",
    },
  });
  await prisma.tag.upsert({
    where: { id: "postgres" },
    update: {},
    create: {
      id: "postgres",
      name: "Postgres",
    },
  });
  await prisma.tag.upsert({
    where: { id: "mongodb" },
    update: {},
    create: {
      id: "mongodb",
      name: "Mongodb",
    },
  });
}

export async function seedBlogs(prisma: PrismaClient) {
  await prisma.blog.upsert({
    where: { id: "a-beginners-guide-to-using-awilix-in-express" },
    update: {},
    create: {
      id: "a-beginners-guide-to-using-awilix-in-express",
      title: "A Beginner's Guide to Using Awilix in Express",
      shortDesc:
        "When building an Express application, managing dependencies can become complex as your application grows. Awilix, a lightweight dependency injection (DI) library, helps simplify this by enabling modular and testable code. In this tutorial, we'll explore how to integrate Awilix into an Express application step by step.",
      longDesc: `<h2>What Is Dependency Injection?</h2><p></p><p>Dependency injection is a design pattern where an objects dependencies are provided from the outside rather than being instantiated within the object itself. This promotes loose coupling and makes your application more maintainable.</p><p>Awilix is a container library that supports DI. It allows you to register and resolve dependencies in an organized and test-friendly way.</p><p></p><hr><p></p><h2>Setting Up the Project</h2><h3>1. Create a New Express Project</h3><p>If you don’t have an existing Express project, create one:</p><pre><code>mkdir express-awilix-tutorial cd express-awilix-tutorial npm init -y npm install express awilix awilix-express</code></pre><p>Heres what each package does:</p><ul><li><p><code>express</code>: The core web framework.</p></li><li><p><code>awilix</code>: The dependency injection container.</p></li><li><p><code>awilix-express</code>: A helper library to integrate Awilix with Express.</p><p></p></li></ul><hr><p></p><p></p><h3>2. Project Structure</h3><p>A typical project structure might look like this:</p><pre><code>express-awilix-tutorial/ ├── src/ │ ├── controllers/ │ │ ├── userController.js │ │ └── postController.js │ ├── services/ │ │ ├── userService.js │ │ └── postService.js │ ├── routes/ │ │ ├── userRoutes.js │ │ └── postRoutes.js │ ├── container.js │ ├── app.js ├── package.json</code></pre><hr><p></p><p></p><h2>Implementing Awilix</h2><h3>1. Configure the Dependency Container</h3><p>In <code>src/container.js</code>, set up the Awilix container:</p><pre><code>const { createContainer, asClass } = require('awilix'); const UserService = require('./services/userService');const PostService = require('./services/postService'); const container = createContainer(); // Register services container.register({ userService: asClass(UserService).singleton(), postService: asClass(PostService).singleton(), }); module.exports = container;</code></pre><p></p><p>Here:</p><ul><li><p><code>createContainer()</code>: Creates a new DI container.</p></li><li><p><code>asClass()</code>: Registers a class to be resolved.</p></li><li><p><code>singleton()</code>: Ensures only one instance is created.</p></li></ul><p></p><hr><p></p><h3>2. Define Services</h3><p>Create service files to hold your business logic.</p><h4><code>src/services/userService.js</code>:</h4><pre><code>class UserService {   getAllUsers() {    return [{ id: 1, name: 'John Doe' }];   }} module.exports = UserService;</code></pre><pre><code>class PostService { getAllPosts() { return [{ id: 1, title: 'Hello World', content: 'My first post!' }]; }} module.exports = PostService;</code></pre><hr><p></p><h3>3. Create Controllers</h3><p>Controllers are responsible for handling HTTP requests and interacting with services.</p><h4><code>src/controllers/userController.js</code>:</h4><pre><code>module.exports = ({ userService }) =&gt; ({ getAllUsers: (req, res) =&gt; { const users = userService.getAllUsers();res.json(users); }, });</code></pre><p>src/controllers/postController.js:</p><pre><code>module.exports = ({ postService }) =&gt; ({ getAllPosts: (req, res) =&gt; { const posts = postService.getAllPosts();res.json(posts);}, });</code></pre><hr><p></p><h3>4. Set Up Routes</h3><p>Define routes and attach them to controllers.</p><h4><code>src/routes/userRoutes.js</code>:</h4><pre><code>const { createController } = require('awilix-express');module.exports = (router) =&gt; { router.get('/users', createController('userController').get('getAllUsers')); };</code></pre><h4><code>src/routes/postRoutes.js</code>:</h4><pre><code>const { createController } = require('awilix-express');module.exports = (router) =&gt; { router.get('/posts', createController('postController').get('getAllPosts'));};</code></pre><p></p><hr><p></p><p></p><h3>5. Initialize Awilix in Express</h3><p>In your main application file, wire everything together.</p><h4><code>src/app.js</code>:</h4><pre><code>const express = require('express');const { scopePerRequest, loadControllers } = require('awilix-express'); const container = require('./container'); const app = express(); // Integrate Awilix app.use(scopePerRequest(container)); // Load controllers automatically app.use(loadControllers('./controllers/*.js', { cwd: __dirname })); // Define routes const userRoutes = require('./routes/userRoutes'); const postRoutes = require('./routes/postRoutes'); const router = express.Router(); userRoutes(router); postRoutes(router); app.use(router); module.exports = app;</code></pre><hr><p></p><h3>6. Start the Server</h3><p>Add a simple entry point to start the server.</p><h4><code>index.js</code>:</h4><pre><code>const app = require('./src/app');const PORT = process.env.PORT || 3000; app.listen(PORT, () =&gt; {   console.log(\`Server is running on http://localhost:\${PORT}\`);});</code></pre><hr><p></p><h2>Testing the Setup</h2><p>Run the application:</p><pre><code>node index.js</code></pre><p>Visit the following endpoints to test:</p><ul><li><p><code>GET http://localhost:3000/users</code></p></li><li><p><code>GET http://localhost:3000/posts</code></p></li></ul><p>You should receive JSON responses with user and post data.</p><p></p><hr><p></p><h2>Benefits of Using Awilix</h2><ol><li><p><strong>Loose Coupling</strong>: Dependencies are easily swapped or mocked during testing.</p></li><li><p><strong>Scalability</strong>: Simplifies managing complex dependency hierarchies.</p></li><li><p><strong>Testability</strong>: You can easily test individual components by injecting mock dependencies.</p></li><li><p><strong>Clean Architecture</strong>: Promotes separation of concerns between routes, controllers, and services.</p></li></ol><hr><p></p><h2>Conclusion</h2><p>By integrating Awilix with Express, you can build modular, testable, and scalable applications. This guide provides a foundation, and you can expand it further with features like middleware injection, custom scopes, and more. Happy coding! 🚀</p><p></p>`,
      isPublished: true,
      isFeatured: true,
      views: 0,
      blogCategoryId: "tutorials",
      userId: 1,
      tags: { connect: [{ id: "express-js" }, { id: "javascript" }] },
    },
  });

  await prisma.user.upsert({
    where: { email: "testuser@gmail.com" },
    update: {},
    create: {
      fullName: "Test User",
      email: "user@gmail.com",
      userName: "TestUser" + MathUtils.getRandom6number(),
      password: hashUtils.hash("user@19918888"),
      emailVerified: true,
      userType: UserType.User,
      isActive: true,
    },
  });
}

export async function seedDiscussions(prisma: PrismaClient) {
  await prisma.discussion.upsert({
    where: { id: "i-wan-to-have-a-code-lab-so-the-instructions" },
    update: {},
    create: {
      id: "i-wan-to-have-a-code-lab-so-the-instructions",
      title: "I wan to have a code labe, Tell me the instructions",
      desc: "<h1>kadkla dalk sdljasdad</h1><p> adla</p><p>a'da</p><p>da</p><p>s</p><p></p><pre><code>asdasd asd ajsldjasljd ad alks dlaksjd</code></pre>",
      isPublished: true,
      views: 0,
      userId: 1,
      tags: {
        connect: [{ id: "realtime" }, { id: "postgres" }],
      },
    },
  });
}
