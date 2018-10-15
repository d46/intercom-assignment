# Assignment
We have some customer records in a text file (customers.txt) -- one customer per line, JSON lines formatted. We want to invite any customer within 100km of our Dublin office for some food and drinks on us. Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).

## Contents

[NPM Scripts](#npm-scripts)

[Haversine](#haversine) 

[Linear Search](#linear-search)

[Binary Search with Latitude Indexed](#binary-search)

[Binary Search 2d with Latitude and Longitude Indexed](#binary-search-2d)

[Binary Search 2d with Latitude and Longitude Indexed and Scaled x10](#binary-search-2d-and-scaled-x10-lat-lon)

[Migrations](#migrations)

[Benchmarks](#benchmarks)

[Tests](#tests)

[Conclusion](#conclusion)

## NPM Scripts

#### `npm run start` 
Starts one-time search execution with the showing hr time.

#### `npm run bench`
Starts benchmark testing for whole search algorithms with 100k times iteration and different loops. I also added some benchmarks to avoid waste of time. 

#### `npm run bench:compare`
Draw benchmarks within the table to compare. Giving with extra parameters, allow to filter rows.

`npm run bench:compare 20k .sync`

## Haversine 

[Haversin Wiki](https://en.wikipedia.org/wiki/Haversine_formula)

Basically, It calculates the arc length of the great circle with the giving points in-fly.

<img src="/assets/haversine.png" width="450">

In my calculations, I will show `Θ(H)`
for the complexity of haversine.

## Linear Search

`R: Range`
`N: Size of the customers`

With the brute force approach, travelling whole customers and filtering with the `R < Θ(H)`

The complexity will be `Θ(N) * Θ(H)`

You can see in `src/search/distance/range/brute-force`

## Binary Search

Let say we have ranged between -90 and +90 in the plane. This range is the maximum of the latitude gap.

<img src="/assets/greate-circle.png" width="450">

And indexing customers' points with their rounded latitude values give a new structure to able to use binary search within that rounded latitudes. I'm also finding a range with a binary search. 

<img src="/assets/step2-binary.jpg" width="450">

At the end of the search, that returns and draws a gap between latitude bounds.

`N: Customers within the area`
The maximum complexity of travelling latitudes will be `Θ(log 180)`. For further approaches scaling latitudes can also give a more efficiency.

Total complexity will be `Θ(log 180) + (Θ(H) * Θ(N))` for this search.
`Θ(log 180): Which is filter N` 

You can see in `src/search/distance/range/binary`


## Binary Search 2D

As we have done in binary search, increasing the data structure gives a more efficiency the reason of filtering `N`. Thus, we can implement that approach also to the longitudes and travel again with binary.

The complexity for 2d search in indexed rounded latitutdes(+90,-90) and longitudes(+180,-180) will be;

`Θ(log 360 + 180) + (Θ(N) * Θ(H))`

<img src="/assets/binary2d.jpg" width="450">

## Binary Search 2D and Scaled x10 Lat Lon

To understand the balance of between searching range and the rate of customers size within the area tried to scale latitude longitude ranges.

Basically increasing the range of latitudes and longitudes, will cause to draw closer squares to the circle and filter the un-wanted customers out of the range.

We were drawn squares onto unit distances. So minimum square was 111km.
Scaling x10 latitude and longitude allow us to draw 11km squares. Look conclusion for more details.

Complexity:

`Θ(log 3600 + 1800) + (Θ(N) * Θ(H))`


## Migrations

Under the `data-source`, I made a `migration` directory to change data-structure for given customers file.

If you have a bigger test file, do this steps.

#### Steps for migration to the raw files
`A: New file name which has the same structure with customers.json`
- Put your JSON file into the `data-source/raw/A.json`
- Add `A` into the `data-source/data-sources-enum.js`
- Run `node data-source/migration`

To make a benchmark do same steps under the `bench/cases/some.js` then add an array bottom of the `bench/run.js` file. 5 times adding will be enough to measure mean and median.

## Benchmarks

**All benchmarks run with 100k iteration.**

For measuring the algorithms, I made a benchmark with a simple design. I also added some benchmark results for you.

Note: Brute force searching with 20k customers taking so much time to make a bench.

To showing benchmarks result run,

`npm run bench:compare`. Also adding more parameters will filter the rows with looking the name fields. So you can run.

`npm run bench:compare 20k .sync` to filter rows consist 20k and .sync words.

![bench](/assets/bench.png "Benchmark")

## Tests

For testing environment, I used [AVAJS](https://github.com/avajs).
I tried to took so simple and separated every kind of steps of flow with functions.

In `test/util` directory, I tried to test almost possible basic cases and some edge cases.

To run tests run,
`npm test`

## Conclusion

In the Binary 2d Search performance is depends on the given range and its indexes. As you can see in the benchmarks when searching with 10km ranged within the 10km using with 'Binary 2d Scale' data structure, we will get better performance according to the 'Binary 2d' in 10km. Because Binary 2d is implemented over 100km latitude gaps and 'Binary 2d Scale' is based on 10km.
