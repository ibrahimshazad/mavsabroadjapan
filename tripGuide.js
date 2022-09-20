//Need MapBox API
mapboxgl.accessToken = 'INSERT HERE';

//CREATE A MAP
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [137.68069363541446,34.82360430872046], // starting position [lng, lat]
zoom: 7 // starting zoom
});


const geojson =
{
    'type': 'FeatureCollection',

    'features':
    [
        {
            'type': 'Feature',

            'geometry':
                {
                'type': 'Point',
                'coordinates': [-77.032, 38.913]
                },

            'properties':
                {
                'title': 'Mapbox',
                'description': 'Washington, D.C.'
                }
        },

        {
        'type': 'Feature',

        'geometry':
            {
            'type': 'Point',
            'coordinates': [-122.414, 37.776]
            },
        'properties':
            {
            'title': 'Mapbox',
            'description': 'San Francisco, California'
            }
        }
    ]
};


var shibuyaInfo =  "Shibuya Crossing (also known as the Scrambleintersection) is one of"+
" the most iconic Tokyo spots. When traffic stops, thousands of people cross the intersection"+
" in all directions. On the ground, it's a lively and energetic rush while you cross the street, surrounded"+
" by the lights, sounds, and people of the city. Step into the Starbucks overlooking the street for a view"+
" from above while sipping a latte, or check it out from the  360° open-air observation deck located on the"+
" roof of the Shibuya Scramble Square skyscraper, called Shibuya Sky. You've probably seen this intersection before,"+
" in movies and music videos. It's surrounded by shops, cafes, restaurants, and constant energy. A must-see spot in Tokyo!"
var hachikoInfo = "Hachikō (ハチ公, 10 November 1923 – 8 March 1935) was a Japanese Akita dog known for his remarkable loyalty."+
" He would leave home and meet his owner, Hidesaburō Ueno,  at  Shibuya Station each evening after his commute from work at"+
" Tokyo Imperial University. One day Ueno suffered a cerebral hemorrhage during a lecture, and never returned to the station where Hachiko waited."+
" Hachiko continued to wait for over nine years following Ueno's death. Commuters and station staff began"+
" to bring him food and treats as word of his faithfulness spread. Hachikō became a nationalsensation. His faithfulnessto his master's memory impressed"+
" the people of Japan as a spirit of family loyalty to which all  should strive to achieve. Teachers and parents used Hachikō's"+
" vigil as an example for children to follow. A bronze statue was erected in his honor at Shibuya Station in 1948, which serves"+
" as a popular meeting spot today."
var meijuInfo = "Meiji Shrine (明治神宮, Meiji Jingū) is a Shinto shrine dedicated to the" +
" first emperor of  modern Japan, Emperor Meiji and Empress Shoken. It  is  the  most popular" +
 " and visited shrine in Japan, with 3 million visitors attending for the traditional first prayers of the New Year"+
 " (Hatsumode). You enter through a large Torii gate, and walk a 10-minute path to the main buildings, surrounded by"+
 " a forest of trees and the sounds of nature. It's a popular place for weddings, events, and rituals. It's open every"+
 " day and admission is free, but you should bring cash if you wish to visit the museum, the inner garden, the gift shops,"+
 " restaurant, or café."
var ameyokoInfo = "Ameya-Yokocho (Ameyoko) is a well known street market in Ueno, with hundreds of"+
" shops and food stalls. After World War II it became known for the many candy shops (the name means"+
" 'sweets shop alley' in Japanese), but it was also known for the American military surplus goods you could buy as well."+
" This  is a lively shopping place where you'll find many bargains, but make time to explore the area as well. This is a lively"+
" shopping place where you'll find many bargains, but make time to explore the area as well. Ueno is also home to the oldest, and"+
" most popular zoo in Japan, established in 1882, as well as Ueno Park, established in 1873. There are also several museums and temples"+
" to explore. Almost everything is close to Ueno station."
var akihabaraInfo = "Akihabara is  a  shopping district well known forelectronics, manga,  anime, video games, maid cafés,and arcades."+
" The area grew rapidly after WWII when there was little government oversight. Its  nicknamebecame 'Electric  Town' because the  shops"+
" there focused on  'futuristic' household  electronics andappliances, and then computers, video games, and thegamers that love them."+
" Now you might consider it thecenter of  pop-culture in  Japan. It's  a  clean and  safearea to shop for otaku culture items and souvenirs."
var miraikanInfo = "The National Museum of Emerging Science and Innovation, known as the Miraikan 未来館, features many science and technological innovations."+
" There are interactive displays within three permanent exhibits, focused on space, the earth, and sustainability. It includes a large, impressive, LED panel display of the earth"+
" (theGeo-Cosmos) with current weather patterns depicted. You'll see a demonstration of Honda’s ASIMO robot, which has opposable thumbs andcan walk, run, and kick a soccer ball."+
" There are English audio guides for the permanent exhibits and a dome theater. There is a small admission fee. Inside is a cafe and museum shop."
var teamLab = "TeamLab Borderless is a digital art museum and an unforgettable visual experience, where you can immerse yourself, interact with,"+
" and influence the art. It's an art collection without boundaries, in a museum without a map, created by the art collective teamLab.This is an"+
" interdisciplinary group of artists formed in 2001 in Tokyo, Japan. The group refers to themselvesas “Ultra-technologists, ” and consists of artists,"+
" programmers, engineers, CG animators, mathematicians, and architects. Some of the artchanges seasonally, and there are special temporary installations"+
" throughout Japan to enjoy. There is anadmission fee (about $30 for adults)."
var starbucksReserve = "Japan is  filled with  coffee shops and  cafes, but  you don't want to  miss this coffee experience at the Starbucks Reserve Roastery"+
" in Tokyo. The building is beautifully and thoughtfully designed, inspired by Japan's love of craftsmanship, innovation, and excellence. Stepping inside is"+
" a wonderland for your senses, with four floors to explore. Exclusive and rare coffees, teas, pastries and merchandise are available."
var sengakuji = "Sengakuji is a famous Buddhist temple located in Minato, Tokyo. This small temple is  famous as the gravesite for the 47 Ronin, or leaderless"+
" Samurai, who died avenging their master's honor. The incident took place in  1701, when Asano Naganori, Feudal Lord of Ako, drew his sword against his rival,"+
" Kira Yoshinaka, within the Edo Castle. He was sentenced to die  by Seppuku, while his rival, who had insulted and maligned him for years, had no punishment."+
" Asano's samurai planned their revenge for almost two years,then attacked and killed Kira, presenting his head to Asano's grave at Sengakuji. They were sentenced"+
" to die by seppuku and buried alongside their master. This true story has been portrayed in numerous plays, movies, television, and literature. The 47 Ronin are"+
" celebrated by the Japanese as cultural icons, for their actions of loyalty, justice, persistence, courage, and honor. Sengakuji hosts the Gishisai Festival on"+
" December 14 of each year to commemorate the 47 Ronin."
var greatBuddha = "The Great Buddha of Kamakura (鎌倉大仏, KamakuraDaibutsu) is a bronze statue standing almost 44 feettall including its base, located on the grounds"+
" of Kotoku-in Temple."+
" It  was built in 1252, and is the second largest Buddha in Japan, second to  the  NaraDaibutsu. It has endured typhoons and earthquakes, and is unique in that it sits"+
" in the open air. Visitors can even go inside the body of the Buddha, and see the construction from  the  inside. It is  one of the most iconic symbols of Kamakura, and"+
" a popular spot for photos. While most of the population of Japan do not adhere to any religious beliefs, Buddhism is second to Shinto beliefs in Japan."
var zushiBeach = "Zushi Beach is popular for all ages, with wind surfing, paddle boarding, swimming, hotels, and restaurants. It's facing Sagami Bay, and"+
" on a clear day, you can see Mount Fuji. It's  also the site for Summer fireworks festivals, film festivals, and 'Yabusame', where mounted archers shoot at"+
" targets while galloping on a horse. There are some restrictions, such as no tattoos, alcohol, barbecues, or loud music. You cannot wear your swimsuit walking"+
" to the beach, but you can change clothes there. It's a nice getaway from the city!"
var kyoto = "Kyoto is a cultural treasure and the former capital of Japan, from 794 - 1868. Here you'll begin from Kyoto Station, in the heart of the city. The"+
" station itself is 15 stories and hosts shops, restaurants, hotels, and a beautiful view of the city on both sides. Kyoto is home to many buddhist temples, shinto"+
" shrines, gardens, and traditional wooden architecture suchas machiya. There is so much to see and do, I recommend guided tours whenever possible."
var gion = "Gion is the entertainment district in Kyoto, with a rich history of traditional arts and architecture, art and antique shops, traditional crafts, tea houses,"+
" and Kabuki theater. If you hope to see Geisha(called  Geiko  in  Kyoto), or Maiko (apprentice Geisha) then you need to visit this area, especially towards the evening,"+
" as they are on their way to appointments. Geisha are considered highly trained entertainers, specializing in music, dance, and the arts. There are daily performances at"+
" Hanami-Koji’s Gion Kobu Kaburenjo  theater, or Gion Corner. As you enjoy this popular area, there are rules to follow. Never touch the Geisha, and photography is not allowed"+
" unless you ask permission."
var fushimi = "The famed vermilion torii gates can be found at Fushimi Inari Shrine. This type of shrine is used to worship the deity Inari. There are thousands of shrines dedicated"+
" to  Inari, which are typically associated with rice, prosperity, the color red, and symbols of foxes. Foxes act as Inari's messengers and are often depicted at the shrine entrance,"+
" holding a symbolic item in their mouth or under their paw. Offerings of rice, sake, and fried tofu are popular. Fushimi Inari-Taisha, the head shrine of Inari, is known for its path of"+
" a thousand vermilion torii gates, which were donated by Japanese merchants. It may take up to 2 hours to walk the entire path, but there are beautiful views, with an overlook of Kyoto"+
" about halfway up. The shrine is open 24 hours a day and there is no fee. There are many shops and food stalls leading to the shrine, and you can purchase a foxema, which is a wooden plaque"+
" where you can write your wishes."
var arashiyama = "The Arashiyama Bamboo Grove on the west side of Kyoto is a beautiful forest of green. The path leads you through towering bamboo trees, which can be a breathtaking, and peaceful"+
" experience. The least crowded time to visit is early morning. There are shops and restaurants in the area around the grove, but in the summer, be prepared for the heat and humidity. This area of"+
" Kyoto is known for its natural beauty, as  well as Togetsukyo Bridge and Tenryujitemple, a World Cultural Heritage site."
var nara = "Japan was unified in Nara, where the first capital was established from 710 - 784. During this time Nara became the center for Buddhism, art, politics, and cultural exchange. As a result"+
" there are many ancient temples and world heritage sites. Nara is also known for hundreds of freely roaming deer. They are considered messengers to the Gods, and are protected as a national treasure."+
" You can buy crackers to feed the deer for about 150 yen, and they are eager to interact with  you, but remember they are wild animals. They will bow and expect a treat, and if you are too slow you may"+
" get a nudge or a nibble! You can see a little of everything by heading toward Nara Park. It is the location of many of Nara's main attractions including Todaiji, Kasuga Taisha, Kofukuji and the NaraNational"+
" Museum."
//Array of information relating to each marker.
var markerInfo =
 [
    { loc : [{lat: 35.66037975626979, lng: 139.70066280766181}], type:"info", placeInfo:"Shibuya Crossing",moreInfo:shibuyaInfo},
    { loc : [{lat: 35.67065390575089, lng: 139.69861567062225}], type:"info", placeInfo:"Hachiko Statue",moreInfo:hachikoInfo },
    { loc : [{lat: 35.676554455246105, lng: 139.69929907583543}], type:"info", placeInfo:"Meiju Shrine",moreInfo:meijuInfo },
    { loc : [{lat: 35.70952048034661, lng: 139.77490331225505}], type:"info", placeInfo:"Ameyoko",moreInfo:ameyokoInfo },
    { loc : [{lat: 35.70229437453533, lng: 139.77447151632572}], type:"info", placeInfo:"Akihabara",moreInfo:akihabaraInfo },
    { loc : [{lat: 35.61947512903015, lng: 139.7764423815267}], type:"info", placeInfo:"Miraikan",moreInfo:miraikanInfo },
    { loc : [{lat: 35.627118473334065, lng: 139.78315574290983}], type:"info", placeInfo:"TeamLab Borderless",moreInfo:teamLab },
    { loc : [{lat: 35.64992664214639, lng: 139.69261146619442}], type:"info", placeInfo:"Starbucks Reserve Roastery",moreInfo:starbucksReserve },
    { loc : [{lat: 35.63824687857572, lng: 139.7360637894642}], type:"info", placeInfo:"Sengakuji Temple",moreInfo:sengakuji },
    { loc : [{lat: 35.31753960396617, lng: 139.53585315863762}], type:"info", placeInfo:"Great Buddha of Kamakura",moreInfo:greatBuddha },
    { loc : [{lat: 35.29259667499185, lng:139.5726875810042}], type:"info", placeInfo:"Zushi Beach",moreInfo:zushiBeach },
    { loc : [{lat: 35.295152855337165, lng: 135.48474266673443}], type:"info", placeInfo:"Kyoto",moreInfo:kyoto },
    { loc : [{lat: 35.00232814196444, lng: 135.77567696820353}], type:"info", placeInfo:"Gion",moreInfo:gion },
    { loc : [{lat: 34.96805425817616, lng: 135.77280041169254}], type:"info", placeInfo:"Fushimi Inari Shrine and Torii Gates",moreInfo:fushimi },
    { loc : [{lat: 35.009508399983936, lng: 135.66675710304258}], type:"info", placeInfo:"Arashiyama Bamboo Grove",moreInfo:arashiyama },
    { loc : [{lat: 34.68610566228876, lng: 135.84322657671925}], type:"info", placeInfo:"Nara Park",moreInfo:nara },
  ];

  for(var n=0;n<markerInfo.length;n++)
  {
              //The heading, textarea and the button are all kept within the container
        //so that later flex display can be applied to have them aligned vertically in the center
        //using css styling
        contentString =  '<div id=contentBox>'+
        '<h4 id="placeName">' +markerInfo[n].placeInfo+'</h4>'+
        '<textarea id="textArea" readonly>'+markerInfo[n].moreInfo+'</textarea>'
        +'</div>'




      // create a HTML element for each feature
      const el = document.createElement('div');

      el.className = 'marker';
      el.style.backgroundImage = 'url(https://img.icons8.com/plasticine/100/000000/map-pin.png)';
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.borderRadius = '50%';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
      .setLngLat(markerInfo[n].loc[0])
      .setPopup(
        new mapboxgl.Popup({className:"mapBoxPopup", offset: 25 }) // add popups
        .setHTML(
        `<h3>${markerInfo[n].placeInfo}</h3><p>${markerInfo[n].moreInfo}</p>`
        )
        )
      .addTo(map);
  }


/*
for (const feature of geojson.features)
{
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(mapbox-icon.png)';
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.borderRadius = '50%';
    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
}
*/
