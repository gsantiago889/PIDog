import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import image from "../img/javierSantiago.png";
import Welcome from "../img/Welcome.gif";

const letsGo = "https://c.tenor.com/CHxqEAdbIX4AAAAC/lets-go-home-go-home.gif";
const url =
  "https://s1.eestatic.com/2021/11/10/actualidad/626198188_214456909_1024x576.jpg";
const url1 = "http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg";
const url2 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdEihCb3vxmwGa7PGfdzvfWPCJNJZQeY8gR2JWcSnD&s";
const url3 =
  "https://images.ecestaticos.com/H4CUeGslvPRglrmCtaP7A4wz9KQ=/0x115:2265x1390/1600x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F8ec%2F08c%2F85c%2F8ec08c85c866ccb70c4f1c36492d890f.jpg";

const Landing = () => {
  return (
    <>
      <div className={style.encabezado}>
        <img className={style.welcome} src={Welcome} alt="Not found" />
        <Link exact to="/home">
          <img className={style.letGo} src={letsGo} alt="Not found" />
        </Link>
      </div>
      <div className={style.background}>
        <div className={style.images}>
          <img className={style.img1} src={url2} alt="Not found" />
          <img className={style.img2} src={url3} alt="Not found" />
          <img className={style.img3} src={url} alt="Not found" />
          <img className={style.img4} src={url1} alt="Not found" />
        </div>
        <div>
          <a
            className={style.Afoot}
            href="https://www.linkedin.com/in/gustavo-javier-santiago-90523a45//"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Javier Santiago
          </a>
          <img className={style.foot} src={image} alt="Link a Linked In" />
        </div>
      </div>
    </>
  );
};

export default Landing;
