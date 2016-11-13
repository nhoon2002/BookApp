// Links to the description of price calculations
// https://www.uber.com/fare-estimate/
// https://www.lyft.com/cities/los-angeles

//TODO: Maximum & minimum distance between point A and B, give error when not within bounds.

//////////////////////////////////////
//UBER: BLACK,SUV,X,SELECT,XL,LUX////
/////////////////////////////////////

//Black:
//Base Fare: 8
//Per Minute: 0.45/Min
//Per Mile: 3.55/Mi
//Minimum: $15 (if cost < min, override with minimum)
//Booking Fee: 0

//SUV:
//Base Fare: 15
//Per Minute: 0.55/Min
//Per Mile: 4.25/Mi
//Minimum: $25 (if cost < min, override with minimum)
//Booking Fee: 0

//X:
//Base Fare: 0
//Per Minute: 0.15/Min
//Per Mile: 0.90/Mi
//Minimum: $5.15 (if cost < min, override with minimum)
//Booking Fee: 1.65

//SELECT:
//Base Fare: 5
//Per Minute: 0.40/Min
//Per Mile: 2.35/Mi
//Minimum: $10.65 (if cost < min, override with minimum)
//Booking Fee: 1.65

//XL:
//Base Fare: 1
//Per Minute: 0.30/Min
//Per Mile: 1.55/Mi
//Minimum: $7.65 (if cost < min, override with minimum)
//Booking Fee: 1.65

//LUX:
//Base Fare: 20
//Per Minute: 0.60/Min
//Per Mile: 5.00/Mi
//Minimum: $30.00 (if cost < min, override with minimum)
//Booking Fee: 0


// Client Token: gAAAAABYI_ENn6ldumm7jHTUtG53VdQ7Zn2I8ujAIHqoSb-VEx_BR05HiXS_9x5cLzyveep29swxc-FAy-GZvoGvl1W6FKmd_Ema9HVAZgPEoMFZif_Eb9mLroaSQCM-URw0InpVrh3lTHoqB3-79SWTOh0cZ5h3O8MJxUJBZlgTiJRaZ856sgY=

// Client Secret: TCvIZn3IiZnifqx5nUeznRW3I-o3M3Jv

//////////////////////////////////////
//LYFT: Line, Lyft, Plus, Premier////
/////////////////////////////////////
//AIRPORT FEES : +$4

//Line:
//ALWAYS LESS THAN Lyft

//Lyft:
//Base Fare: 0
//Per Minute: 0.16/Min
//Per Mile: 0.88/Mi
//Minimum: $3.50 (if cost < min, override with minimum)
//Maximum: $240.00
//Service Fee: 1.80
