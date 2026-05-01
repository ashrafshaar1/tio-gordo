import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// Import your local logo image
import logo from './assets/logo.png';

const menuData = {
  shawarma: [
    { id: 1, name: 'Chicken Shawarma Large', nameAr: 'شاورما دجاج كبير', price: '$5.05', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Chicken, Garlic sauce, French fries, pickles (Saj bread or Arabic bread).', descriptionAr: 'دجاج، ثوم، بطاطا مقلية، كبيس (خبز صاج أو الخبز عربي).' },
    { id: 2, name: 'Chicken Shawarma Small', nameAr: 'شاورما دجاج صغير', price: '$3.37', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Chicken, Garlic sauce, French fries, pickles (Saj bread or Arabic bread).', descriptionAr: 'دجاج، ثوم، بطاطا مقلية، كبيس (خبز صاج أو الخبز عربي).' },
    { id: 3, name: 'Beef Shawarma Large', nameAr: 'شاورما لحم كبير', price: '$6.75', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Beef, Tarator sauce, tomatoes, parsley, onions, pickles (Saj bread or Arabic Bread).', descriptionAr: 'لحم ، طرطور، طماطم، بقدونس، بصل، كبيس (خبز صاج أو خبز عربي).' },
    { id: 4, name: 'Beef Shawarma Small', nameAr: 'شاورما لحم صغير', price: '$4.5', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Beef, Tarator sauce, tomatoes, parsley, onions, pickles (Saj bread or Arabic Bread).', descriptionAr: 'لحم ، طرطور، طماطم، بقدونس، بصل، كبيس (خبز صاج أو خبز عربي).' },
    { id: 5, name: 'Sejok Shawarma Large', nameAr: 'شاورما سجق كبير', price: '$5.61', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Sejok, Garlic sauce, tomatoes, pickles.', descriptionAr: 'سجق، ثوم، طماطم، كبيس.' },
    { id: 6, name: 'Sejok Shawarma Small', nameAr: 'شاورما سجق صغير', price: '$3.37', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Sejok, Garlic sauce, tomatoes, pickles.', descriptionAr: 'سجق، ثوم، طماطم، كبيس.' },
    { id: 7, name: 'Sejok Shawarma Special', nameAr: 'شاورما سجق سبيشل', price: '$6.75', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Sejok, Garlic sauce, tomatoes, pickles, Mozzarella Cheese.', descriptionAr: 'سجق، ثوم، طماطم، كبيس، جبنة موزاريلا.' },
    { id: 8, name: 'Turkey Chicken Shawarma', nameAr: 'شاورما دجاج تركي', price: '$6.75', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Chicken, Garlic, Mayo, Oregano, Tomato Sauce, lettuce, red cabbage.', descriptionAr: 'دجاج، ثوم، مايونيز، أوريجانو، صلصة طماطم، خس، ملفوف أحمر.' },
    { id: 9, name: 'Turkey Beef Shawarma', nameAr: 'شاورما لحم تركي', price: '$7.86', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Beef, Garlic, Mayo, Oregano, Tomato Sauce, lettuce, red cabbage.', descriptionAr: 'لحم، ثوم، مايونيز، صلصة طماطم، أوريجانو، خس، ملفوف أحمر.' },
    { id: 10, name: 'Turkey Sejok Shawarma', nameAr: 'شاورما سجق تركي', price: '$6.75', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Shawarma', description: 'Sejok, Garlic, Mayo, Oregano, Tomato Sauce, lettuce, red cabbage.', descriptionAr: 'سجق، ثوم، مايونيز، صلصة طماطم، أوريجانو، خس، ملفوف أحمر.' },
    { id: 11, name: 'Chicken Shawarma 250g', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 12, name: 'Beef Shawarma 250g', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 13, name: 'Sejok Shawarma 250g', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 14, name: 'Chicken Shawarma 500g', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 15, name: 'Beef Shawarma 500g', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 16, name: 'Sejok Shawarma 500g', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 17, name: 'Chicken Shawarma Platter', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 18, name: 'Beef Shawarma Platter', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 19, name: 'Sejok Shawarma Platter', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },

  ],
  snacks: [
    { id: 20, name: 'Chicken Barbeque', nameAr: 'دجاج باربكيو', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken Barbeque, Mayo, Rocca, Fresh Mushrooms, Mozzarella Cheese.', descriptionAr: 'دجاج باربكيو، مايونيز، روكا، فطر طازج، جبنة موزاريلا.' },
    { id: 21, name: 'Spicy Chicken', nameAr: 'دجاج حار', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Spicy Chicken, Mayo, Lettuce, Rocca, Fresh Mushrooms, Mozzarella Cheese.', descriptionAr: 'دجاج حار، مايونيز، خس، روكا، فطر طازج، جبنة موزاريلا.' },
    { id: 22, name: 'Chicken Sub', nameAr: 'دجاج', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken, Garlic sauce, coleslaw, cocktail sauce, BBQ sauce, French fries, cheddar.', descriptionAr: 'دجاج، ثوم، سلطة كول سلو، صلصة كوكتيل، باربكيو، بطاطا مقلية، جبنة الشيدر.' },
    { id: 23, name: 'Mixed Mexican Chicken Sub', nameAr: 'دجاج مكسيكي مشكل', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken, Green pepper, onions, carrot, lettuce, mayo sauce, mozzarella cheese, soy sauce.', descriptionAr: 'دجاج، فلفل أخضر، بصل، جزر، خس، مايونيز، جبنة موزاريلا، صلصة صويا.' },
    { id: 24, name: 'Crispy', nameAr: 'كرسبي', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Crispy Chicken, Garlic sauce, coleslaw, cocktail sauce, BBQ sauce, French fries, cheddar.', descriptionAr: 'دجاج كرسبي، ثوم، سلطة كول سلو، كوكتيل، باربكيو، بطاطا مقلية، جبنة شيدر.' },
    { id: 25, name: 'Fajita', nameAr: 'فاهيتا', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken, Green pepper, onions, corn, mozzarella cheese, avocado sauce, soy sauce.', descriptionAr: 'دجاج، فلفل أخضر، بصل، ذرة، جبنة موزاريلا، صلصة أفوكادو، صلصة صويا.' },
    { id: 26, name: 'Zinger (Chicken)', nameAr: 'زنجر (دجاج)', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken, Mayo sauce, lettuce, tomatoes, cheddar cheese, jalapeño.', descriptionAr: 'دجاج، صلصة مايونيز، خس، طماطم، جبنة شيدر، هالبينو.' },
    { id: 27, name: 'Escalope', nameAr: 'إسكالوب', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken, Mayo sauce, lettuce, tomatoes, ketchup, Mozzarella Cheese.', descriptionAr: 'دجاج، صلصة مايونيز، خس، طماطم، كاتشب، جبنة موزاريلا.' },
    { id: 28, name: 'Francisco', nameAr: 'فرانسيسكو', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken, Mayo, Pickles, Lettuce, Corn, Soya Sauce, Mozzarella Cheese.', descriptionAr: 'دجاج، مايونيز، كبيس، خس، ذرة، صلصة صويا، جبنة موزاريلا.' },
    { id: 29, name: 'Tawook', nameAr: 'طاووق', price: '$5.05', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Tawook, Garlic sauce, French fries, pickles, coleslaw', descriptionAr: 'طاووق، ثوم، بطاطا مقلية، كبيس، سلطة كول سلو' },
    { id: 30, name: 'Chicken Sawda', nameAr: 'سودة دجاج', price: '$5.05', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Chicken Sawda, Sawda, Garlic, Pickles, Tomato, Debs Reman.', descriptionAr: 'دجاج سودة، سودة، ثوم، كبيس، طماطم، دبس الرمان.' },
    { id: 31, name: 'Philadelphia Beef', nameAr: 'فيلادلفيا لحم', price: '$7.87', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Beef, Green pepper, onions, mushrooms, mayo sauce, Mozzarella Cheese.', descriptionAr: 'لحم بقري، فلفل أخضر، بصل، فطر، صلصة مايونيز، جبنة موزاريلا.' },
    { id: 32, name: 'Steak', nameAr: 'ستيك', price: '$7.87', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Steak, Mozzarella Cheese, and onion.', descriptionAr: 'ستيك لحم، جبنة موزاريلا، وبصل.' },
    { id: 33, name: 'Rosto', nameAr: 'روستو', price: '$7.87', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Rosto, Mayo, Lettuce, pickles, tomato, mustard, corn.', descriptionAr: 'روستو، مايونيز، خس، كبيس، طماطم، خردل، ذرة.' },
    { id: 34, name: 'Makanek', nameAr: 'مقانق', price: '$5.05', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Makanek, Mayo, Pickles, Tomato, Debs Reman.', descriptionAr: 'مقانق، مايونيز، كبيس، طماطم، دبس الرمان.' },
    { id: 35, name: 'Crab', nameAr: 'كراب', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Crab, Mayo, Lettuce, pickles, Soya Sauce, Cocktail Sauce.', descriptionAr: 'كراب، مايونيز، خس، كبيس، صلصة صويا، صلصة كوكتيل.' },
    { id: 36, name: 'Shrimps', nameAr: 'قريدس', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Shrimps, Mayo, Lettuce, pickles, Soya Sauce, Cocktail Sauce.', descriptionAr: 'قريدس، مايونيز، خس، كبيس، صلصة صويا، صلصة كوكتيل.' },
    { id: 37, name: 'Crab & Shrimps', nameAr: 'كراب & قريدس', price: '$6.75', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Falafel', description: 'Crab & Shrimps, Mayo, Lettuce, pickles, Soya Sauce, Cocktail Sauce.', descriptionAr: 'كراب وقريدس، مايونيز، خس، كبيس، صلصة الصويا، صلصة الكوكتيل.' },
  ],
  burgers: [
    { id: 38, name: 'Lebanese Burger', nameAr: 'برغر لبناني', price: '$5.05', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Burger', description: 'Beef patty, garlic sauce, pickles, tomatoes, fries, served with coleslaw.', descriptionAr: 'شريحة لحم بقري، ثوم، كبيس، طماطم، بطاطس مقلية، يقدم مع سلطة الكول سلو.' },
    { id: 39, name: 'Cheese Burger', nameAr: 'برغر بالجبنة', price: '$5.62', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Burger', description: 'Beef patty, cheddar cheese, lettuce, tomatoes, pickles, mayo sauce.', descriptionAr: 'شريحة لحم بقري، جبنة شيدر، خس، طماطم، كبيس، صلصة مايونيز.' },
    { id: 40, name: 'Chicken Pesto Burger', nameAr: 'برغر دجاج بيستو', price: '$8.49', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Burger', description: 'Grilled chicken breast, pesto sauce, mozzarella cheese, lettuce, tomatoes.', descriptionAr: 'صدر دجاج مشوي، صلصة بيستو، جبنة موزاريلا، خس، طماطم.' },
    { id: 41, name: 'Mushroom Burger', nameAr: 'برغر بالفطر', price: '$8.99', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Burger', description: 'Beef patty, sautéed mushrooms, Swiss cheese, caramelized onions, garlic sauce.', descriptionAr: 'شريحة لحم بقري، فطر مشوي، جبنة سويسرية، بصل مكرمل، صلصة ثوم.' },
  ],
  platters: [
    { id: 42, name: 'Chicken Shawarma Platter', nameAr: 'طبق شاورما دجاج', price: '$6.18', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 43, name: 'Beef Shawarma Platter', nameAr: 'طبق شاورما لحمة', price: '$7.86', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with Tarator Sauce, Tomato, Debs reman, Onions, Parsley.', descriptionAr: 'يقدّم مع الطرطور، الطماطم، دبس الرمان، البصل والبقدونس.' },
    { id: 44, name: 'Sejok Shawarma Platter', nameAr: 'طبق شاورما سجق', price: '$7.30', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Platter', description: 'Served with French Fries, pickles, Tomato, Garlic.', descriptionAr: 'يقدّم مع البطاطا المقلية، المخلل، الطماطم، الثوم.' },
    { id: 45, name: 'Crispy Platter Large', nameAr: 'طبق كرسبي كبير', price: '$11.24', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Grill', description: '6 Crispy Pcs Served with coleslaw, French Fries, garlic sauce, BBQ sauce, cheddar.', descriptionAr: '6 قطع كرسبي تقدّم مع سلطة الكول سلو، البطاطا المقلية، ثوم، الباربكيو، جبن الشيدر.' },
    { id: 46, name: 'Crispy Platter Small', nameAr: 'طبق كرسبي صغير', price: '$8.43', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Grill', description: '4 Crispy Pcs Served with coleslaw, French Fries, garlic sauce, BBQ sauce, cheddar.', descriptionAr: '4 قطع كرسبي تقدّم مع سلطة الكول سلو، البطاطا المقلية، ثوم، الباربكيو، جبن الشيدر.' },
    { id: 47, name: 'Steak Mushroom Platter', nameAr: 'طبق ستيك والفطر', price: '$14.61', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Kafta', description: 'Served with Fresh Mushroom Sauce, French Fries, Red lettuce.', descriptionAr: 'يقدّم مع صلصة الفطر الطازج، البطاطا المقلية، الخس الأحمر.' },
  ],
  salads: [
    { id: 48, name: 'Chicken Ceaser Salad', nameAr: 'سلطة سيزر بالدجاج', price: '$', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Fattoush', description: 'Chicken, Lettuce, Cherry Tomatos, Parmesan Cheese Served with Tio Dressing.', descriptionAr: 'دجاج، خس، طماطم كرزية، جبنة بارميزان، يقدم مع صلصة تيو.' },
    { id: 49, name: 'Crab Salad', nameAr: 'سلطة الكراب', price: '$', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Tabbouleh', description: 'Crap, Carrot, Lettuce, Fresh Mushrooms, Avocado Served with Tio dressing.', descriptionAr: 'كراب، جزر، خس، فطر طازج، أفوكادو، يقدم مع صلصة تيو.' },
    { id: 50, name: 'Lebanese Salad', nameAr: 'سلطة لبنانية', price: '$', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Greek', description: 'Tomato, Lettuce, Cucumber, Mint Served with Lemon Dressing.', descriptionAr: 'طماطم، خس، خيار، نعناع، ​​يقدم مع صلصة الليمون.' },
  ],
  addon: [
    { id: 51, name: 'Frensh Fries (Large)', nameAr: 'بطاطس مقلية (كبيرة)', price: '$5.62', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Garlic', description: 'Crispy French Fries', descriptionAr: 'بطاطس مقلية مقرمشة' },
    { id: 52, name: 'Frensh Fries (Small)', nameAr: 'بطاطس مقلية (صغيرة)', price: '$3.37', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Tahini', description: 'Crispy French Fries', descriptionAr: 'بطاطس مقلية مقرمشة' },
    { id: 53, name: 'Mozzarella Sticks', nameAr: 'أصابع الموزاريلا', price: '$3.93', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Pickles', description: '6 pcs of Mozzarella Sticks served with marinara sauce', descriptionAr: 'أصابع موزاريلا مقرمشة تقدم مع صلصة المارينارا' },
    { id: 54, name: 'Onion Rings', nameAr: 'حلقات البصل', price: '$3.93', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Fries', description: '9 pcs of Crispy Onion Rings', descriptionAr: 'حلقات بصل مقرمشة' },
  ],
  dips: [
    { id: 55, name: 'Cheddar', nameAr: 'شيدر', price: '$0.79', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Hummus', description: 'Cheddar Cheese Sauce', descriptionAr: 'صلصة جبنة الشيدر' },
    { id: 56, name: 'Honey Mustard', nameAr: 'خردل بالعسل', price: '$0.56', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Baba', description: 'Honey Mustard Sauce', descriptionAr: 'صلصة الخردل بالعسل' },
    { id: 57, name: 'Garlic', nameAr: 'ثوم', price: '$0.56', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Moutabal', description: 'Creamy Garlic Sauce', descriptionAr: 'صلصة ثوم كريمية' },
    { id: 58, name: 'Barbeque Sauce', nameAr: 'صوص باربكيو', price: '$0.56', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Labneh', description: 'BBQ Sauce', descriptionAr: 'صلصة باربكيو' },
    { id: 59, name: 'Cocktail Sauce', nameAr: 'صوص كوكتيل', price: '$0.56', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Labneh', description: 'Cocktail Sauce', descriptionAr: 'صلصة كوكتيل' },
    { id: 60, name: 'Sertcha Sauce', nameAr: 'صوص سريراتشا', price: '$0.56', image: 'https://via.placeholder.com/80x80/6B8E23/ffffff?text=Muhammara', description: 'Sriracha Sauce', descriptionAr: 'صلصة سريراتشا' },
  ],
  softdrinks: [
    { id: 61, name: 'Pepsi', nameAr: 'بيبسي', price: '$1.13', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Coke', description: 'Pepsi Cola', descriptionAr: 'بيبسي كولا' },
    { id: 62, name: '7 up', nameAr: 'سفن أب', price: '$1.13', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Diet', description: '7 Up Lemon Soda', descriptionAr: 'سفن أب' },
    { id: 63, name: 'Meranda', nameAr: 'ميراندا', price: '$1.13', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Sprite', description: 'Orange Soda', descriptionAr: 'ميراندا برتقال' },
    { id: 64, name: 'Ayran', nameAr: 'عيران', price: '$0.90', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Fanta', description: 'Yogurt Drink', descriptionAr: 'عيران' },
    { id: 65, name: 'Ice Tea', nameAr: 'شاي مثلج', price: '$1.13', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Water', description: 'Iced Tea', descriptionAr: 'شاي مثلج' },
    { id: 66, name: 'Water', nameAr: 'ماء', price: '$0.34', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Sparkling', description: 'Mineral Water', descriptionAr: 'ماء معدني' },
  ],
  combos: [
    { id: 67, name: 'Snacks Combo add on', nameAr: 'اضافة سناك كومبو', price: '$3.37', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Combo', description: 'Any Snack Sandwich Served With French Fries, Salad and any Soft Drink.', descriptionAr: 'أي سناك ساندويتش يُقدم مع بطاطس مقلية، سلطة وأي مشروب غازي.' },
  ],
  offers: [
   { id: 68, name: 'Snacks Combo add on', nameAr: 'اضافة سناك كومبو', price: '$2.24', image: 'https://via.placeholder.com/80x80/E53935/ffffff?text=Combo', description: 'Any Snack Sandwich Served With French Fries, Salad and any Soft Drink.', descriptionAr: 'أي سناك ساندويتش يُقدم مع بطاطس مقلية، سلطة وأي مشروب غازي.' },
  ]
};

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('shawarma');
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);

  const categories = [
    { id: 'shawarma', name: 'Shawarma Sandwiches', nameAr: 'شاورما' },
    { id: 'snacks', name: 'Snacks Sandwiches', nameAr: 'سناك' },
    { id: 'burgers', name: 'Burgers', nameAr: 'برغر' },
    { id: 'platters', name: 'Platters', nameAr: 'أطباق' },
    { id: 'combos', name: 'Snacks Combos', nameAr: 'سناك كومبو' },
    { id: 'offers', name: 'Special Offers', nameAr: 'عروض خاصة' },
    { id: 'salads', name: 'Salads', nameAr: 'سلطات' },
    { id: 'addon', name: 'Add On', nameAr: 'إضافات' },
    { id: 'dips', name: 'Dips', nameAr: 'مقبلات' },
    { id: 'softdrinks', name: 'Soft Drinks', nameAr: 'مشروبات غازية' },
  ];

  // Categories that should NOT show modal on click
  const noModalCategories = ['addon', 'dips', 'softdrinks'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => {
      if (stickyRef.current) {
        observer.unobserve(stickyRef.current);
      }
    };
  }, []);

  const formatArabicPrice = (price) => {
    const arabicNumbers = {
      '$': '',
      '0': '٠',
      '1': '١',
      '2': '٢',
      '3': '٣',
      '4': '٤',
      '5': '٥',
      '6': '٦',
      '7': '٧',
      '8': '٨',
      '9': '٩',
      '.': '٫'
    };
    
    return price.replace(/[$0-9.]/g, match => arabicNumbers[match] || match);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Close modal when changing category
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    // Don't show modal for addon, dips, and softdrinks categories
    if (noModalCategories.includes(activeCategory)) {
      return;
    }
    setSelectedItem(item);
  };

  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="Tio Gordo" className="logo" />
      </header>

      {/* Sticky navigation with blur effect when sticky */}
      <div 
        ref={stickyRef}
        className={`sticky-wrapper ${isSticky ? 'sticky' : ''}`}
      >
        <nav className="category-nav">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span className="category-name">{cat.name}</span>
              <span className="category-name-ar">{cat.nameAr}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="menu-container">
        <h2 className="category-title">
          {categories.find(c => c.id === activeCategory)?.name}
        </h2>
        
        <div className="menu-items">
          {menuData[activeCategory] && menuData[activeCategory].map(item => (
            <div
              key={item.id}
              className="menu-item"
              onClick={() => handleItemClick(item)}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-names">
                <div className="item-name-en">{item.name}</div>
                <div className="item-name-ar">{item.nameAr}</div>
              </div>
              <div className="item-price">{item.price}</div>
            </div>
          ))}
        </div>
      </main>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <div className="modal-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="modal-details">
              <h3 className="modal-name-en">{selectedItem.name}</h3>
              <h3 className="modal-name-ar">{selectedItem.nameAr}</h3>
              <div className="modal-description">
                <p className="modal-description-en">{selectedItem.description}</p>
                <p className="modal-description-ar">{selectedItem.descriptionAr}</p>
              </div>
              <div className="modal-price">
                <span className="modal-price-en">{selectedItem.price}</span>
                <span className="modal-price-ar">
                  {formatArabicPrice(selectedItem.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;