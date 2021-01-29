# shellenergy-csv
A CLI to fetch energy usage data from Shell Energy

## Usage
### Installation
```
npm install -g shellenergy-csv
```

### Options
- `-s/--sessionId`: A valid Shell Energy Session ID (required)
- `-c/--customerId`: A valid Shell Energy Customer ID (required)
- `-d/--date`: The ISO date for which to fetch usage data. Defaults to yesterday.

### Example
```
$ shellenergy-csv -s i1yr5emfltt22enr1238glc8r1 -c 1234567 -d 2021-01-16
CSV generated succesfully and saved as 2021-01-16.csv
$
```

## Restrictions
- Only supported granularity is halfhourly at the moment
- Assumes that available energy types are `gas` and `electricity`.