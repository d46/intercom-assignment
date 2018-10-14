# Assignment
We have some customer records in a text file (customers.txt) -- one customer per line, JSON lines formatted. We want to invite any customer within 100km of our Dublin office for some food and drinks on us. Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).

## Contents

[NPM Scripts](#scripts)

[Haversine](#haversine) 

[Lineer Search](#lineerSearch)

[Binary Search with Latitude Indexed](#binarySearch)

[Binary Search 2d with Latitude and Longitude Indexed](#binarySearch)

[Migrations](#migrations)

[Benchmarks](#benchmarks)

[Tests](#tests)

[Edge Cases](#edgeCases)

[Conclusion](#conclusion)

## NPM Scripts

#### `npm run serve` 
Starts search api. Only works with binary search 2d with enchanted.

#### `npm run start` 
Starts one time search execution with the showing hr time.

#### `npm run bench`
Starts benchmark testing for whole search algorithms with 100k times iteration and different loops. I also added some benchmarks to avoid waste of time. 

#### `npm run bench:compare`
Draw benchmarks within table to compare. Giving with extra parameters, allow to filter rows.

`npm run bench:compare 20k .sync`



## Haversine 

[Haversin Wiki](https://en.wikipedia.org/wiki/Haversine_formula)

Basically, It's calculate the arc length of greate circle with the giving points in-fly.

<img src="/assets/haversine.png" width="450">

In my calculations, I will show `Θ(H)`
for the complexity's of haversine.

## Lineer Search

`R: Range`
`N: Size of the customers`

With the brute force approach, travelling whole customers and filtering with the `R < Θ(H)`

The complexity will be `Θ(N) * Θ(H)`

You can see in `src/search/distance/range/brute-force`

## Binary Search

Let say we have range between -90 and +90 in the plane. This range is the maximum of the latitude gap.

<img src="/assets/greate-circle.png" width="450">

And indexing customers's points with their rounded latitude values,
gives a new structe to able to use binary search within that 
rounded latitudes. I'm also finding range with binary search. 

<img src="/assets/step2-binary.jpg" width="450">

At the end of search, that returns and draws a gap between latitude bounds.

`N: Customers within the area`
The maximum complexity of travelling 
latitudes will be `Θ(log 180)`. For further approaches scaling latitudes can also gives a more efficiency.

Total complexity will be `Θ(log 180) + (Θ(H) * Θ(N))` for this search.
`Θ(log 180): Which is filter N` 

You can see in `src/search/distance/range/binary`


## Binary Search 2D

As we have done in binary search, increasing the data structure gives a more efficiency the reason of filtering `N`. Thus, we can implement that approach too the longitudes and travel again with binary.

The complexity for 2d search in indexed rounded latitutdes(+90,-90) and longitudes(+180,-180) will be;

`Θ(log 360 + 180) + (Θ(N) * Θ(H))`

<img src="/assets/binary2d.jpg" width="450">

## Migrations

Under the `data-source`, I made a `migration` directory to change data-structre for given customers file.

If you have a bigger test file, do this steps.

#### Steps for migration to the raw files
`A: New file name which has same structure with customers.json`
- Put your json file in to the `data-source/raw/A.json`
- Add `A` into the `data-source/data-sources-enum.js`
- Run `node data-source/migration`

To make a benchmark import that json file in to `bench/run.js` then add an array bottom of file. 5 times adding will be enough to measure mean and median.

## Benchmarks

**All benchmarks run with 100k iteration.**

For measuring the algorithms, I made a benchmark with a simple design. I also added some benchmark results for you.

Note: Brute force searching with 20k customers taking so much time to make a bench.

To showing benchmarks result run,

`npm run bench:compare`. Also adding more parameters will filter the rows with looking the name fileds. So you can run.

`npm run bench:compare 20k .sync` to filter rows consist 20k and .sync words.

![bench](/assets/bench.png "Benchmark")

## Tests

For testing enviroment, I used [AVAJS](https://github.com/avajs).
I tried to took so simple and seperated every kind of steps of flow with functions.

In `test/util` directory, I tried to test almost possible basic cases and some edge cases.

To run tests run,
`npm test`
