const express = require('express');
const fs = require('fs').promises;
const ejs = require('ejs');

const app = express();
const PORT = 3000;
const dataFilePath = 'page_views.json';

// Middleware для обработки счетчика просмотров
const pageViewsMiddleware = async (req, res, next) => {
  try {
    let data = await fs.readFile(dataFilePath, 'utf-8');
    data = JSON.parse(data);
    const url = req.originalUrl;

    if (data[url]) {
      data[url] += 1;
    } else {
      data[url] = 1;
    }

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

app.use(pageViewsMiddleware);
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const data = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
  const homePageViews = data['/'] || 0;
  res.render('index', { title: 'Главная страница', views: homePageViews, link: 'О нас', href: '/about' });
});

app.get('/about', async (req, res) => {
  const data = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
  const aboutPageViews = data['/about'] || 0;
  res.render('about', { title: 'О нас', views: aboutPageViews, link: 'Главная страница', href: '/' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});