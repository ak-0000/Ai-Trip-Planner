import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

// Retrieve the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

// Set up the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Configuration for the generation process
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start a chat session with the model using a predefined prompt
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. 
                  Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, 
                  geo coordinates, rating, descriptions and suggest itinerary with placeName, 
                  Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of 
                  the location for 3 days with each day plan with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
          {
            "hotels": [
              {
                "hotelName": "The D Las Vegas",
                "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
                "price": "$50-$80 per night",
                "hotelImageUrl": "https://www.theD.com/media/images/hotel/exterior-day-750x422.jpg",
                "geoCoordinates": "36.1696, -115.1423",
                "rating": 4.0,
                "description": "A downtown casino hotel with a retro vibe, offering affordable rooms, a pool, and multiple dining options. It's located in the heart of Fremont Street Experience."
              },
              {
                "hotelName": "Plaza Hotel & Casino",
                "hotelAddress": "1 Main Street, Las Vegas, NV 89101",
                "price": "$60-$100 per night",
                "hotelImageUrl": "https://www.plazahotelcasino.com/media/images/hero-carousel/plaza-exterior-day-750x422.jpg",
                "geoCoordinates": "36.1693, -115.1422",
                "rating": 4.5,
                "description": "A historic hotel with a modern touch, offering luxurious rooms, a spa, multiple dining options, and a rooftop pool with stunning city views."
              },
              {
                "hotelName": "Golden Nugget Las Vegas",
                "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",
                "price": "$70-$120 per night",
                "hotelImageUrl": "https://www.goldennugget.com/images/uploads/general/exterior_full.jpg",
                "geoCoordinates": "36.1691, -115.1409",
                "rating": 4.2,
                "description": "A popular downtown casino hotel known for its shark tank aquarium, multiple dining options, and lively nightlife."
              },
              {
                "hotelName": "The Strat Hotel, Casino & SkyPod",
                "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",
                "price": "$50-$90 per night",
                "hotelImageUrl": "https://www.thestrat.com/media/images/hotel/exterior-day-750x422.jpg",
                "geoCoordinates": "36.1174, -115.1695",
                "rating": 3.8,
                "description": "A high-rise hotel offering affordable rooms, a casino, multiple dining options, and a skypod with thrilling rides and panoramic views."
              },
              {
                "hotelName": "Circus Circus Hotel & Casino",
                "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
                "price": "$40-$70 per night",
                "hotelImageUrl": "https://www.circuscircus.com/media/images/hotel/exterior-day-750x422.jpg",
                "geoCoordinates": "36.1085, -115.1711",
                "rating": 3.5,
                "description": "A family-friendly hotel with a circus theme, offering affordable rooms, a midway, multiple dining options, and a casino."
              }
            ],
            "itinerary": [
              {
                "day": "Day 1",
                "bestTimeToVisit": "Morning",
                "plan": [
                  {
                    "placeName": "Fremont Street Experience",
                    "placeDetails": "Experience the vibrant atmosphere of Fremont Street Experience, a pedestrian mall with a giant canopy displaying light shows and live entertainment.",
                    "placeImageUrl": "https://www.visitlasvegas.com/media/images/freemont-street-experience.jpg",
                    "geoCoordinates": "36.1696, -115.1423",
                    "ticketPricing": "Free",
                    "timeToTravel": "2-3 hours"
                  },
                  {
                    "placeName": "The Mob Museum",
                    "placeDetails": "Explore the history of organized crime in Las Vegas, showcasing interactive exhibits and artifacts.",
                    "placeImageUrl": "https://www.themobmuseum.org/sites/default/files/styles/hero_image/public/images/hero-images/the-mob-museum-exterior-at-night.jpg",
                    "geoCoordinates": "36.1695, -115.1450",
                    "ticketPricing": "$29.95 per adult",
                    "timeToTravel": "2-3 hours"
                  },
                  {
                    "placeName": "Pinball Hall of Fame",
                    "placeDetails": "Play over 200 classic and modern pinball machines from different eras. A great place to enjoy some retro fun.",
                    "placeImageUrl": "https://www.pinballhallfame.org/images/site/hero-images/pinball-hall-of-fame-exterior.jpg",
                    "geoCoordinates": "36.1712, -115.1403",
                    "ticketPricing": "$12 per adult",
                    "timeToTravel": "1-2 hours"
                  }
                ]
              },
              {
                "day": "Day 2",
                "bestTimeToVisit": "Afternoon",
                "plan": [
                  {
                    "placeName": "Hoover Dam",
                    "placeDetails": "Take a day trip to Hoover Dam, a marvel of engineering and a popular tourist destination, offering guided tours and stunning views.",
                    "placeImageUrl": "https://www.nps.gov/hdam/planyourvisit/images/hoover-dam-overview-wide.jpg",
                    "geoCoordinates": "36.0100, -114.7200",
                    "ticketPricing": "$30 per adult for a tour",
                    "timeToTravel": "4-5 hours (including travel time)"
                  }
                ]
              },
              {
                "day": "Day 3",
                "bestTimeToVisit": "Evening",
                "plan": [
                  {
                    "placeName": "Bellagio Fountains",
                    "placeDetails": "Watch the mesmerizing synchronized water and light show at the Bellagio Fountains, a free spectacle on the Las Vegas Strip.",
                    "placeImageUrl": "https://www.visitlasvegas.com/media/images/bellagio-fountains-show.jpg",
                    "geoCoordinates": "36.1142, -115.1702",
                    "ticketPricing": "Free",
                    "timeToTravel": "1-2 hours"
                  },
                  {
                    "placeName": "Linq Promenade",
                    "placeDetails": "Enjoy the vibrant atmosphere of the Linq Promenade, featuring shops, restaurants, and the High Roller Observation Wheel.",
                    "placeImageUrl": "https://www.caesars.com/media/images/linq/linq-promenade-750x422.jpg",
                    "geoCoordinates": "36.1193, -115.1721",
                    "ticketPricing": "Free to walk, $30 per adult for the High Roller",
                    "timeToTravel": "2-3 hours"
                  }
                ]
              }
            ]
          }
          \`\`\`

          **Notes:**
          * This itinerary focuses on free and budget-friendly activities. 
          * Consider using public transportation or ride-sharing services to save on transportation costs.
          * Check websites for current ticket prices and operating hours.
          * You can adjust this itinerary based on your interests and preferences. 
          * This is a sample itinerary and can be customized based on your preferences and budget. 
          `,
        },
      ],
    },
  ],
});
