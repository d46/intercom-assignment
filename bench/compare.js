import * as fs from 'fs';
import * as path from 'path';
import CliTable from 'cli-table2';

const benchmarks = fs
  .readdirSync(path.join(__dirname, 'results'))
  // Iterate files
	.map((file) => {
		const result = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'results', file), 'utf8'
      )
    );
		return result
  })
  // Group benchmarks with it own names
  .reduce((acc, benchmarks) => {
    benchmarks.forEach((benchmark) => {
      // Group with algorithm and various loops
      // Eg. bruteForce32Customer.asyncTimeout
      const propertyName = `${benchmark.plainName}.${benchmark.type}`;
      // Create array for the first hit
      if (!acc.hasOwnProperty(propertyName)) acc[propertyName] = [];
      acc[propertyName].push(benchmark);
    });
    return acc;
  }, {});

const cliTable = new CliTable({
  head: ['Name', 'Mean', 'Median', 'Min', 'Max']
});


Object.keys(benchmarks)
      .forEach(benchmarksGroupName => {
        const benchmarksGroup = benchmarks[benchmarksGroupName].sort((benchA, benchB) => benchB.time - benchA.time);
        const sum = benchmarksGroup.reduce((acc, benchmark) => acc += benchmark.time / 1000, 0);
        const size = benchmarksGroup.length;
        const max = benchmarksGroup[0].time / 1000;
        const min = benchmarksGroup[size -1].time / 1000;
        const mean = Math.round((sum / size) * 1000) / 1000;
        const median = benchmarksGroup[Math.floor(size/2)].time / 1000;
        cliTable.push([benchmarksGroupName, `${mean} sec`, `${median} sec`, `${min} sec`, `${max} sec`]);
      });

console.log(cliTable.toString());
