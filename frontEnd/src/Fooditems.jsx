import chai from './assets/Recipes/Breakfast/chai.png';
import coffee from './assets/Recipes/Breakfast/coffee.png';
import combo from './assets/Recipes/Breakfast/combo.png';
import fruiutcombo from './assets/Recipes/Breakfast/fruiutcombo.png';
import idledosacombo from './assets/Recipes/Breakfast/idledosacombo.png';
import breakfastspecial from './assets/Recipes/Breakfast/breakfastspecial.png';
import khir from './assets/Recipes/Breakfast/khir.png';
import momos from './assets/Recipes/Breakfast/momos.png';
import sandwich from './assets/Recipes/Breakfast/sandwich.png';
import toastedegg from './assets/Recipes/Breakfast/toastedegg.png';

import bhagiya from './assets/Recipes/Lunch/bhagiya.png';
import kachori from './assets/Recipes/Lunch/kachori.png';
import paneerroll from './assets/Recipes/Lunch/paneerroll.png';
import panipuri from './assets/Recipes/Lunch/panipuri.png';
import pasta from './assets/Recipes/Lunch/pasta.png';
import samosa from './assets/Recipes/Lunch/samosa.png';

import biryani from './assets/Recipes/Dinner/biryani.png';
import chines from './assets/Recipes/Dinner/chines.png';
import paneerlachcha from './assets/Recipes/Dinner/paneerlachcha.png';
import paneerrice from './assets/Recipes/Dinner/paneerrice.png';
import pizza from './assets/Recipes/Dinner/pizza.png';
import pulav from './assets/Recipes/Dinner/pulav.png';

import chocolatecreame from './assets/Recipes/Desert/chocolatecreame.png';
import faluda from './assets/Recipes/Desert/faluda.png';
import gulabjamun from './assets/Recipes/Desert/gulabjamun.png';
import mohabat from './assets/Recipes/Desert/mohabat.png';
import orangeicecreame from './assets/Recipes/Desert/orangeicecreame.png';

const foodItems = [
  { name: 'Chai', image: chai, category: 'Breakfast', restaurant: 'Bapu Ka Ragda', price: 15, location: 'Alkapuri' },
  { name: 'Coffee', image: coffee, category: 'Breakfast', restaurant: 'Chacha Bombay Wala', price: 25, location: 'Gorwa' },
  { name: 'Combo', image: combo, category: 'Breakfast', restaurant: 'Ajays', price: 50, location: 'Sama' },
  { name: 'Fruit Combo', image: fruiutcombo, category: 'Breakfast', restaurant: 'Taj Garden', price: 60, location: 'Sayajigunj' },
  { name: 'Idle Dosa Combo', image: idledosacombo, category: 'Breakfast', restaurant: 'South Taste', price: 80, location: 'Gotri' },
  { name: 'Breakfast Special', image: breakfastspecial, category: 'Breakfast', restaurant: 'Morning Café', price: 90, location: 'Sama' },
  { name: 'Khir', image: khir, category: 'Breakfast', restaurant: 'Rajwadi', price: 40, location: 'Navayard' },
  { name: 'Momos', image: momos, category: 'Breakfast', restaurant: 'Street Wok', price: 60, location: 'Sama' },
  { name: 'Sandwich', image: sandwich, category: 'Breakfast', restaurant: 'Taj Chat Wala', price: 35, location: 'Gotri' },
  { name: 'Toasted Egg', image: toastedegg, category: 'Breakfast', restaurant: 'Bombay Biryani', price: 30, location: 'Gorwa' },

  { name: 'Bhagiya', image: bhagiya, category: 'Lunch', restaurant: 'Ahmadavadi Tava Fry', price: 45, location: 'Sayajigunj' },
  { name: 'Kachori', image: kachori, category: 'Lunch', restaurant: 'Rajwadi', price: 30, location: 'Wagodiya' },
  { name: 'Paneer Roll', image: paneerroll, category: 'Lunch', restaurant: 'Chacha Bombay Wala', price: 50, location: 'Alkapuri' },
  { name: 'Panipuri', image: panipuri, category: 'Lunch', restaurant: 'Bapu Ka Ragda', price: 20, location: 'Gotri' },
  { name: 'Pasta', image: pasta, category: 'Lunch', restaurant: 'Eagle Chinese', price: 70, location: 'Gotri' },
  { name: 'Samosa', image: samosa, category: 'Lunch', restaurant: 'Ahmadavadi Tava Fry', price: 25, location: 'Gorwa' },

  { name: 'Biryani', image: biryani, category: 'Dinner', restaurant: 'Bombay Biryani', price: 120, location: 'Alkapuri' },
  { name: 'Chinese', image: chines, category: 'Dinner', restaurant: 'Eagle Chinese', price: 100, location: 'Gotri' },
  { name: 'Paneer Lachcha', image: paneerlachcha, category: 'Dinner', restaurant: 'Rajwadi', price: 150, location: 'Sayajigunj' },
  { name: 'Paneer Rice', image: paneerrice, category: 'Dinner', restaurant: 'Rajwadi', price: 130, location: 'Navayard' },
  { name: 'Pizza', image: pizza, category: 'Dinner', restaurant: 'Bapu Ka Ragda', price: 130, location: 'Sama' },
  { name: 'Pulav', image: pulav, category: 'Dinner', restaurant: 'Rajwadi', price: 80, location: 'Sama' },

  { name: 'Chocolate Cream', image: chocolatecreame, category: 'Desert', restaurant: 'Sweet Tooth', price: 60, location: 'Gotri' },
  { name: 'Faluda', image: faluda, category: 'Desert', restaurant: 'Taj Chat Wala', price: 55, location: 'Wagodiya' },
  { name: 'Gulab Jamun', image: gulabjamun, category: 'Desert', restaurant: 'Rajwadi', price: 40, location: 'Navayard' },
  { name: 'Mohabat', image: mohabat, category: 'Desert', restaurant: 'Sweet Magic', price: 70, location: 'Alkapuri' },
  { name: 'Orange Ice Cream', image: orangeicecreame, category: 'Desert', restaurant: 'Rajwadi', price: 35, location: 'Navayard' },
];

export default foodItems;
