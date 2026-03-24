import { groq } from "next-sanity";

export const HOMEPAGE_QUERY = groq`*[_type == "home_page"] | order(order asc){
  _id, order, type, title, description, image, lists
}`;

export const FREESIGNUPFORM_QUERY = groq`*[_type == "free_signup_form"]{
  _id, subtitle, title, description, image
}`;

export const ENROLLNOWPAGE_QUERY = groq`*[_type == "enrollnow_page"]{
  _id, order, subtitle, title, description, price, image, lists
}`;

export const THANKSPAGE_QUERY = groq`*[_type == "thanks_page"]{
  _id, type, title, description, image
}`;

export const MYLEARNINGPAGE_QUERY = groq`*[_type == "myLearning"] | order(order asc){
  _id, order, title, description, image
}`;

export const ABOUTUSPAGE_QUERY = groq`*[_type == "about_page"] | order(order asc){
  _id, order, title, description, image
}`;

export const SIGNINPAGE_QUERY = groq`*[_type == "signin_page"]{
  _id, title, description, image
}`;

export const FAQS_QUERY = groq`*[_type == "faq"] | order(order asc){
  _id, order, title, content, active
}`;

export const PRODUCTS_QUERY = groq`*[_type == "product"] | order(pageNumber asc){
  _id, pageNumber, type, runningHead, body, answerList
}`;

export const MiniCheatSheet1_QUERY = groq`*[_type == "minicheatsheet1"] | order(pageNumber asc){
  _id, pageNumber, type, runningHead, body, answerList
}`;

export const MiniCheatSheet2_QUERY = groq`*[_type == "minicheatsheet2"] | order(pageNumber asc){
  _id, pageNumber, type, runningHead, body, answerList
}`;

export const MiniCheatSheet3_QUERY = groq`*[_type == "minicheatsheet3"] | order(pageNumber asc){
  _id, pageNumber, type, runningHead, body, answerList
}`;

export const MiniCheatSheet4_QUERY = groq`*[_type == "minicheatsheet4"] | order(pageNumber asc){
  _id, pageNumber, type, runningHead, body, answerList
}`;
