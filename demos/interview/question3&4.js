const saleItems = [
    {
        month: 1,
        date: 12,
        transationId: "item1",
        salePrice: 10,
    },
    {
        month: 2,
        date: 31,
        transationId: "item1",
        salePrice: 20,
    },
    {
        month: 3,
        date: 12,
        transationId: "item1",
        salePrice: 30,
    },
    {
        month: 4,
        date: 12,
        transationId: "item1",
        salePrice: 40,
    },
    {
        month: 5,
        date: 12,
        transationId: "item1",
        salePrice: 50,
    },
    {
        month: 6,
        date: 12,
        transationId: "item1",
        salePrice: 60,
    },
    {
        month: 7,
        date: 12,
        transationId: "item1",
        salePrice: 70,
    },
    {
        month: 8,
        date: 12,
        transationId: "item1",
        salePrice: 80,
    },
    {
        month: 9,
        date: 12,
        transationId: "item1",
        salePrice: 90,
    },
    {
        month: 10,
        date: 12,
        transationId: "item1",
        salePrice: 100,
    },
    {
        month: 11,
        date: 12,
        transationId: "item1",
        salePrice: 110,
    },
    {
        month: 12,
        date: 12,
        transationId: "item1",
        salePrice: 120,
    },
]

function sumByQuarter(saleItems) {
    const result = saleItems.reduce((quarter,item) => {
        const whichQuarter = saleItems.find(arrItem => {
            console.log('/',arrItem);
            Math.ceil(arrItem.month/3)===1
        });

        console.log(whichQuarter);
    },[])
    return result;
}

function averageByQuarter(saleItems) {
    
}

// sumByQuarter(saleItems);

var data = [{"score":1,iNum:2},{"score":2,iNum:3},{"score":3,iNum:4},{"score":3,iNum:5}];

var result = data.reduce(function(r, e) {
   var score = e.score;
   var scoreType = score %2==0 ? `${score-1}-${score}`:`${score}-${score+1}`
  r[scoreType] = (r[scoreType] || 0) + e.iNum;
  return r;
}, {});

console.log(result);