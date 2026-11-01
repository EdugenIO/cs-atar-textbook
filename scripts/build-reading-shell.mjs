import fs from 'node:fs';import vm from 'node:vm';
import {courseNavigation} from './course-navigation.mjs';
const file='dist/index.html';let html=fs.readFileSync(file,'utf8');const c=vm.createContext({});vm.runInContext(fs.readFileSync('dist/app.js','utf8'),c);
const home=vm.runInContext('textbookHome()+footer',c);
html=html.replace(/(<main id="main"[^>]*>)[\s\S]*?(<\/main>)/,'$1'+home.replaceAll('$','$$$$')+'$2');
html=html.replace(/<aside\b[\s\S]*?<\/aside>/,()=>courseNavigation());
if(!html.includes('href="course-navigation.css'))html=html.replace('</head>','<link rel="stylesheet" href="course-navigation.css"></head>');
if(!html.includes('id="textbook-runtime"')){
 const start=html.indexOf('<script src="chapters.js"'),end=html.indexOf('<script data-page-control="back-to-top"');
 if(start<0||end<start)throw Error('Missing ordered textbook scripts');
 const scripts=html.slice(start,end);html=html.slice(0,start)+'<template id="textbook-runtime">'+scripts+'</template><script src="textbook-loader.js"></script>'+html.slice(end);
 const deferred=[];
 html=html.replace(/<link rel="stylesheet" href="((?:teaching-planner|assessments|learning|depth)\.css[^"\s]*)">/g,link=>{deferred.push(link);return '';});
 html=html.replace('<template id="textbook-runtime">','<template id="textbook-runtime">'+deferred.join(''));
}
if(!html.includes('src="course-navigation.js'))html=html.replace(/<script src="textbook-loader\.js[^\"]*"><\/script>/,'<script src="course-navigation.js"></script>$&');
fs.writeFileSync(file,html);
console.log('Built static reading home; full textbook scripts/styles wait for reading or search.');
