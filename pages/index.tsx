import Head from 'next/head';
import Image from 'next/image';
import { Button, Box, Typography, Grid } from '@mui/material';
import { FC } from 'react';
import { CategoryCard } from '@/components/base/main/CategoryCard';

const items = [
  {
    id: 1,
    image: 'amortizator',
    name: 'Амортизаторы',
    quantity: 10,
  },
  {
    id: 2,
    image: 'bagazhnik',
    name: 'Багажники',
    quantity: 10,
  },
  {
    id: 3,
    image: 'brizgoviki',
    name: 'Брызговики',
    quantity: 10,
  },
  {
    id: 4,
    image: 'deflectors',
    name: 'Дефлекторы',
    quantity: 10,
  },
  {
    id: 5,
    image: 'karter',
    name: 'Защита картера двигателя',
    quantity: 10,
  },
  {
    id: 6,
    image: 'kovriki',
    name: 'Автомобильные коврики',
    quantity: 10,
  },
  {
    id: 7,
    image: 'nakladki',
    name: 'Накладки на пороги и бампер',
    quantity: 10,
  },
  {
    id: 8,
    image: 'navesi',
    name: 'Навесное оборудование',
    quantity: 10,
  },
  {
    id: 9,
    image: 'podkrilki',
    name: 'Подкрылки',
    quantity: 10,
  },
  {
    id: 10,
    image: 'porogi',
    name: 'Пороги для автомобиля',
    quantity: 10,
  },
  {
    id: 11,
    image: 'reshetka',
    name: 'Решетки радиатора и бампера',
    quantity: 10,
  },
  {
    id: 12,
    image: 'vnedorozhnik',
    name: 'Внедорожные аксессуары',
    quantity: 10,
  },
];

const Home: FC = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
        direction={'column'}
        sx={{ padding: '20px 0' }}
      >
        <Grid item xs={12} lg={6} container spacing={2}>
          <Grid
            item
            xs={12}
            lg={6}
            container
            spacing={2}
            direction={'column'}
            justifyContent='space-between'
          >
            <Grid item sx={{ height: '285px' }}>
              <CategoryCard
                key={items[0].id}
                quantity={items[0].quantity}
                image={items[0].image}
              >
                {items[0].name}
              </CategoryCard>
            </Grid>
            <Grid item sx={{ height: '285px' }}>
              <CategoryCard
                key={items[1].id}
                quantity={items[1].quantity}
                image={items[1].image}
              >
                {items[1].name}
              </CategoryCard>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ height: '610px' }}>
            <CategoryCard
              key={items[2].id}
              quantity={items[2].quantity}
              image={items[2].image}
            >
              {items[2].name}
            </CategoryCard>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} container spacing={2}>
          <Grid item xs={12} lg={6} container spacing={2}>
            <Grid item xs={12} lg={6} sx={{ height: '285px' }}>
              <CategoryCard
                key={items[3].id}
                quantity={items[3].quantity}
                image={items[3].image}
              >
                {items[3].name}
              </CategoryCard>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ height: '285px' }}>
              <CategoryCard
                key={items[4].id}
                quantity={items[4].quantity}
                image={items[4].image}
              >
                {items[4].name}
              </CategoryCard>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ height: '285px' }}>
            <CategoryCard
              key={items[5].id}
              quantity={items[5].quantity}
              image={items[5].image}
            >
              {items[5].name}
            </CategoryCard>
          </Grid>
        </Grid>
      </Grid>
      <p>
        Автомир – группа компаний, основанная четверть века назад и
        представляющая иностранные автомобильные марки в Москве и всей России на
        правах официального дилера. На сегодняшний день мы сотрудничаем с 18
        брендами европейских, японских и корейских автопроизводителей. Это самые
        востребованные, надежные и прогрессивные автомобильные марки в самых
        различных покупательских сегментах – от бюджетных до премиальных.
      </p>
      <p>Спектр наших услуг – полное комплексное обслуживание клиентов:</p>
      <p>
        Помощь в выборе авто, экспертные консультации, детальное сравнение
        моделей и комплектаций, тестовые заезды.
      </p>
      <p>Продажа транспортных средств – заключение сделки в течение 1 часа!</p>
      <p>
        Кредитование или рассрочка по удобным программам наших финансовых
        партнеров.
      </p>
      <p>Страхование КАСКО, ОСАГО на выгодных условиях.</p>
      <p>Обмен старого автомобиля на новый с зачетом части стоимости.</p>
      <p>
        Техническое обслуживание и диагностика в наших сервисных центрах на
        фирменном оборудовании производителя.
      </p>
      <p>
        Сервис «Автомир Assistance» - помощь в любой нештатной ситуации на
        дороге!
      </p>
      <p>
        Напоминаем: сотрудничество с дилерским центром дает возможность
        пользоваться полным пакетом гарантий от производителя!
      </p>
    </>
  );
};

export default Home;
