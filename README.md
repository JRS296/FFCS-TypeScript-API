<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">FFSC Backend using Typescript, Node Js, Express and MySQL</h3>

  <p align="center">
    By: Jonathan Rufus Samuel - 20BCT0332
    <br />
    <strong>Solution for Problem Statements for VIT (2023 Batch) - Dyte</strong>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#er-diagram">ER Diagram</a></li>
    <li><a href="#testing-results">Testing Results</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This Project pertains to the 1st round of Dyte's on Campus Recruitments for VIT Vellore, for the year 2023. In short, this project is a backend with Typescript, Node Js, Express and MySQL, with its primary functionality in being able to handle API calls pertaining to VIT's <b>FFCS System</b> for handling course registration amongst its students.

Cloud General Access Link: (Please edit CORS as required to use) <b>Unable to Deploy due to private nature of GitHub repo on 3rd part cloud service providers like Heroku and Render. Will update later on status of General Access Link as required</b>

<b>Key Features:</b>
* Can be accessed as both admin as well as student.
* Full Admin functionality for creation of courses and slots, registration of students and teachers and more.
* Can individually track Registered Courses of all students. Provides security by means of <b>Bearer Token Authentication</b>. (Login not handled via explicit route, handled via Bearer Authentication Token.)
* Logic implemented to handle clashing of registered courses (returns error with status code: 400)
* Follows API specification as mentioned by this webpage: <a>https://dyte-hiring-docs.pages.dev/#/</a>
* Security within routes, students can see data only relevant to themselves

<b>Important:</b>
* Bearer Token for Admin: admin
* Bearer Token for students: {student_id} (Eg: 20BCT0332, 20BCT0306)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

Built with the following tech stack:

* Typescript - https://www.typescriptlang.org/
* Node Js - https://nodejs.org/en/
* Express Js - https://expressjs.com/
* MySQL - https://www.mysql.com/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps:

### Prerequisites

Install npm using the following command:

  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   https://github.com/JRS296/FFCS-TypeScript-API.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure CORS as required to establish connection with frontend as required by CORS policy.
   ```js
   app.use(cors({ origin: "https://dyte-hiring-docs.pages.dev" })); //Cors origin ID
   ```
4. Configure MySQL on local machine. Go to ./MySQL/config.ts and configure data as required. 
Here is an example from the config.ts file that comes by default with this repository.
   ```js
   const connection = new Sequelize({ dialect: "mysql", host: "localhost", username: "root", password: "123456", database: "ffcs", port: 3307,
    logging: false, models: [Faculty, Student, Course, RegCourses, Timings, StudentTimetable], });
   ```

5. Set up Postman, or any other API testing tool to interact with the Backend. You can also interact with the API directly through this link: 

6. And Remember,
* Bearer Token for Admin: admin
* Bearer Token for students: {student_id} (Eg: 20BCT0332, 20BCT0306)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ER Diagram -->
## ER Diagram

![image](https://user-images.githubusercontent.com/70965472/222976404-5775b5a2-08ea-4ccc-9b21-f792d034a2b6.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Testing Results -->
## Testing Results

Results of Python Environment Based Testing: (Link: https://github.com/dyte-submissions/vit-hiring-2023-phase1-test)

![image](https://user-images.githubusercontent.com/70965472/222976933-bb4eef45-bef3-4ee1-8df2-069144128acf.png)
![image](https://user-images.githubusercontent.com/70965472/222976965-2bef5c08-1937-478d-9829-f0fa67c4fc80.png)
![image](https://user-images.githubusercontent.com/70965472/222976975-fb475aae-3ab6-45e4-bf98-4d86e0dcbeb5.png)
Testing: <b>SUCCESSFULL</b>

Results of Jest Unit API Testing: (Link: https://jestjs.io/docs/getting-started)

![image](https://user-images.githubusercontent.com/70965472/222977794-83376ecb-f115-4f63-9419-17fc7b8c03b0.png)
Testing: <b>Unsuccessful - Was unable to properly configure Jest for typescript environment, along with lack of time to modularize modules for UNIT tests. Can implement it in due time if required.</b>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Jonathan Rufus Samuel - jonathanrufus.samuel2020@vitstudent.ac.in

Project Link: [https://github.com/dyte-submissions/vit-hiring-2023-phase-1-JRS296](https://github.com/dyte-submissions/vit-hiring-2023-phase-1-JRS296)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I'd like to take some time out to thank Dyte for the opportunity to attempt this test, had an amazing time brainstorming and figuring out a solution to the problem at hand. :)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
