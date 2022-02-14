#!/bin/sh

#
# These tests must be run one after another
# NOT all at once using truffle test
# I created an async test factory to reuse unit tests
# Therefore if we run them at once on the same tets env
# Its causing random race conditions
#

# Uncomment when multiple test run
rm -rf codecoverage
mkdir codecoverage

echo "Testing Coverage MillionR_V1"
truffle run coverage --file="test/millionr_v1.test.js"
mv coverage codecoverage/1

# Uncomment when multiple test run
# echo "Testing Coverage N"
# truffle run coverage --file="./test/N.test.js"
# mv coverage codecoverage/N

echo "Testing Coverage MillionR_Exchange"
truffle run coverage --file="test/millionr_exchange_v1.test.js"
mv coverage codecoverage/2

# Merge coverage reports
cd codecoverage
npx istanbul-merge --out coverage.json ./1/coverage-final.json ./2/coverage-final.json
npx istanbul report --include coverage.json --dir final html
start final/index.html