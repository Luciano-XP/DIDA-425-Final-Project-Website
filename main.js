// variables
let yearTrendChartInstance = null,
    demographicChartInstance = null,
    childVsOverallChartInstance = null,
    costPerMealChartInstance = null,
    interactiveChartInstance = null;
let foodInsecurityData = null;
let statesList = [];

// Function to generate Viridis colors with more variety
function generateViridisColors(count) {
    const viridisColors = [
        '#440154', '#482878', '#3e4989', '#31688e', '#26828e', '#1f9e89',
        '#35b779', '#6ece58', '#b5de2b', '#fde725', '#481567', '#453781',
        '#33638d', '#287d8e', '#21918c', '#20a387', '#3dbc74', '#79d151',
        '#c2df23', '#fde725'
    ];
    if (count <= viridisColors.length) {
        return viridisColors.slice(0, count);
    }
    // If more colors are needed, repeat the palette
    const repeatedColors = [];
    while (repeatedColors.length < count) {
        repeatedColors.push(...viridisColors);
    }
    return repeatedColors.slice(0, count);
}

// charrts
function renderStaticCharts() {
    if (!foodInsecurityData || !foodInsecurityData.length) return;
    // Destroy existing chart instances to avoid duplicates
    if (yearTrendChartInstance) yearTrendChartInstance.destroy();
    if (demographicChartInstance) demographicChartInstance.destroy();
    if (childVsOverallChartInstance) childVsOverallChartInstance.destroy();
    if (costPerMealChartInstance) costPerMealChartInstance.destroy();
    // Prepare aggregated data for national trends (2019-2022)
    const years = ['2019', '2020', '2021', '2022'];
    const aggregatedData = {
        overallRates: [], childRates: [],
        demographicRates: { black: [], hispanic: [], white: [] },
        costPerMeal: []
    };
    years.forEach(year => {
        const yearData = foodInsecurityData.filter(item => item.year === year);
        if (!yearData.length) {
            aggregatedData.overallRates.push(null);
            aggregatedData.childRates.push(null);
            aggregatedData.demographicRates.black.push(null);
            aggregatedData.demographicRates.hispanic.push(null);
            aggregatedData.demographicRates.white.push(null);
            aggregatedData.costPerMeal.push(null);
            return;
        }
        let overallSum=0, overallCount=0,
            childSum=0, childCount=0,
            blackSum=0, blackCount=0,
            hispanicSum=0, hispanicCount=0,
            whiteSum=0, whiteCount=0,
            costSum=0, costCount=0;
        yearData.forEach(item => {
            if (item.overallRate !== null) { overallSum += item.overallRate; overallCount++; }
            if (item.childRate !== null)   { childSum += item.childRate; childCount++; }
            if (item.blackRate !== null)   { blackSum += item.blackRate; blackCount++; }
            if (item.hispanicRate !== null){ hispanicSum += item.hispanicRate; hispanicCount++; }
            if (item.whiteRate !== null)   { whiteSum += item.whiteRate; whiteCount++; }
            if (item.costPerMeal !== null) { costSum += item.costPerMeal; costCount++; }
        });
        aggregatedData.overallRates.push(overallCount ? overallSum/overallCount : null);
        aggregatedData.childRates.push(childCount ? childSum/childCount : null);
        aggregatedData.demographicRates.black.push(blackCount ? blackSum/blackCount : null);
        aggregatedData.demographicRates.hispanic.push(hispanicCount ? hispanicSum/hispanicCount : null);
        aggregatedData.demographicRates.white.push(whiteCount ? whiteSum/whiteCount : null);
        aggregatedData.costPerMeal.push(costCount ? costSum/costCount : null);
    });
    // food secuirty years
    const yearTrendCtx = document.getElementById('yearTrendChart')?.getContext('2d');
    if (yearTrendCtx) {
        yearTrendChartInstance = new Chart(yearTrendCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Overall Food Insecurity Rate (%)',
                    data: aggregatedData.overallRates.map(val => val !== null ? val * 100 : null),
                    borderColor: generateViridisColors(1)[0],
                    backgroundColor: generateViridisColors(1)[0] + '33', // Add transparency
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Allow chart to fill the increased canvas size
                plugins: {
                    title: { display: true, text: 'Food Insecurity Trend (2019-2022)' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Food Insecurity Rate (%)' }
                    }
                }
            }
        });
    }
    // demographic chart
    const demographicCtx = document.getElementById('demographicChart')?.getContext('2d');
    if (demographicCtx) {
        demographicChartInstance = new Chart(demographicCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Black',
                        data: aggregatedData.demographicRates.black.map(val => val !== null ? val * 100 : null),
                        backgroundColor: generateViridisColors(5)[0]
                    },
                    {
                        label: 'Hispanic',
                        data: aggregatedData.demographicRates.hispanic.map(val => val !== null ? val * 100 : null),
                        backgroundColor: generateViridisColors(5)[2]
                    },
                    {
                        label: 'White (non-Hispanic)',
                        data: aggregatedData.demographicRates.white.map(val => val !== null ? val * 100 : null),
                        backgroundColor: generateViridisColors(5)[4]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Allow chart to fill the increased canvas size
                plugins: {
                    title: { display: true, text: 'Food Insecurity by Demographic' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Food Insecurity Rate (%)' }
                    }
                }
            }
        });
    }
    // child vs overall chart
    const childVsOverallCtx = document.getElementById('childVsOverallChart')?.getContext('2d');
    if (childVsOverallCtx) {
        childVsOverallChartInstance = new Chart(childVsOverallCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Overall Food Insecurity',
                        data: aggregatedData.overallRates.map(val => val !== null ? val * 100 : null),
                        backgroundColor: generateViridisColors(3)[0]
                    },
                    {
                        label: 'Child Food Insecurity',
                        data: aggregatedData.childRates.map(val => val !== null ? val * 100 : null),
                        backgroundColor: generateViridisColors(3)[2]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Allow chart to fill the increased canvas size
                plugins: {
                    title: { display: true, text: 'Child vs. Overall Food Insecurity' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Food Insecurity Rate (%)' }
                    }
                }
            }
        });
    }
    // average cost per meal chart
    const costPerMealCtx = document.getElementById('costPerMealChart')?.getContext('2d');
    if (costPerMealCtx) {
        costPerMealChartInstance = new Chart(costPerMealCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Cost Per Meal ($)',
                    data: aggregatedData.costPerMeal,
                    borderColor: generateViridisColors(1)[0],
                    backgroundColor: generateViridisColors(1)[0] + '33', // Add transparency
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Allow chart to fill the increased canvas size
                plugins: {
                    title: { display: true, text: 'Average Cost Per Meal (2019-2022)' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Cost ($)' }
                    }
                }
            }
        });
    }
}

// parse csv
async function loadCSVData() {
    return new Promise((resolve, reject) => {
        Papa.parse('data/MMG_AggByStateAndYear.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: results => {
                const data = [];
                const statesSet = new Set();

                // helper to parse numbers or null
                const parseVal = v => {
                    if (v === undefined || v === '' || v.toUpperCase() === 'NA') return null;
                    const n = parseFloat(v);
                    return isNaN(n) ? null : n;
                };

                results.data.forEach(row => {
                    const state = row.State?.trim();
                    const year  = row.Year?.trim();
                    if (!state || !year) return;

                    statesSet.add(state);

                    const entry = {
                        state,
                        year,
                        overallRate: parseVal(row['Food Insecurity Rate']),
                        childRate:   parseVal(row['Child Food Insecurity Rate']),
                        blackRate:   parseVal(row['Food Insecurity Rate among Black Persons']),
                        hispanicRate:parseVal(row['Food Insecurity Rate among Hispanic Persons']),
                        whiteRate:   parseVal(row['Food Insecurity Rate among White Persons']),
                        costPerMeal: parseVal(row['Cost Per Meal'])
                    };
                    if (entry.overallRate !== null) {
                        data.push(entry);
                    }
                });

                statesList = Array.from(statesSet).sort();
                populateStateCheckboxes(statesList);
                resolve(data);
            },
        });
    });
}


// individual state selection (do not touch anything related)
function populateStateCheckboxes(states) {
    const container = document.getElementById('stateCheckboxes');
    if (!container) return;
    container.innerHTML = '';
    states.forEach(state => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-4 col-6 mb-2';
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'form-check';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input state-checkbox';
        checkbox.id = `state-${state}`;
        checkbox.value = state;
        checkbox.checked = true;
        checkbox.addEventListener('change', renderInteractiveChart);
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = `state-${state}`;
        label.textContent = getStateName(state);
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        col.appendChild(checkboxDiv);
        container.appendChild(col);
    });
}

// had this generated but its just states and their abbreviations
function getStateName(abbr) {
    const stateNames = {
        'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California',
        'CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia',
        'HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa',
        'KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland',
        'MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri',
        'MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey',
        'NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio',
        'OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina',
        'SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont',
        'VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming',
        'DC':'District of Columbia'
    };
    return stateNames[abbr] || abbr;
}

function aggregateDataByState(data, metric, year) {
    const filtered = (year === 'all') ? data : data.filter(item => item.year === year);
    const result = {};
    filtered.forEach(item => {
        let value;
        switch (metric) {
            case 'overall':   value = item.overallRate; break;
            case 'child':     value = item.childRate; break;
            case 'black':     value = item.blackRate; break;
            case 'hispanic':  value = item.hispanicRate; break;
            case 'white':     value = item.whiteRate; break;
            case 'cost':      value = item.costPerMeal; break;
            default:          value = item.overallRate;
        }
        if (value !== null) {
            if (year === 'all') {
                // Use the most recent year’s value for each state when all years are selected
                if (!result[item.state] || parseInt(item.year) > parseInt(result[item.state].year)) {
                    result[item.state] = { value: value, year: item.year };
                }
            } else {
                result[item.state] = value;
            }
        }
    });
    if (year === 'all') {
        // Flatten { value, year } to just value for output
        for (const state in result) {
            result[state] = result[state].value;
        }
    }
    return result;
}

// labels
function getMetricLabel(metric) {
    const labels = {
        overall: 'Overall Food Insecurity Rate (%)',
        child:   'Child Food Insecurity Rate (%)',
        black:   'Food Insecurity Rate - Black (%)',
        hispanic:'Food Insecurity Rate - Hispanic (%)',
        white:   'Food Insecurity Rate - White (%)',
        cost:    'Cost Per Meal ($)'
    };
    return labels[metric] || labels.overall;
}

// interactive chart instead of a map. still took me multiple days to figure out :/
function renderInteractiveChart() {
    const ctx = document.getElementById('interactiveChart')?.getContext('2d');
    const displayMode = document.getElementById('stateSelector').value;
    const year       = document.getElementById('yearSelector').value;
    const metric     = document.getElementById('metricSelector').value;
    const sortOrder  = document.getElementById('sortOrder').value;
    // individual state selection
    const stateSelectionContainer = document.getElementById('stateSelectionContainer');
    if (stateSelectionContainer) {
        stateSelectionContainer.style.display = (displayMode === 'custom') ? 'block' : 'none';
    }
    // display
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
        if (displayMode === 'all') {
            chartContainer.style.height = '800px';  // taller for all states
        } else if (displayMode === 'custom') {
            const checkedCount = document.querySelectorAll('.state-checkbox:checked').length;
            chartContainer.style.height = (checkedCount > 10) ? `${400 + (checkedCount - 10) * 15}px` : '400px'; //barely know how this works tbh
        } else {
            chartContainer.style.height = '400px';   // default height for top10/bottom10
        }
    }
    // displayed states
    let statesToDisplay = [];
    if (displayMode === 'custom') {
        const checkedStates = document.querySelectorAll('.state-checkbox:checked');
        statesToDisplay = Array.from(checkedStates).map(cb => cb.value);
    } else if (displayMode === 'top10' || displayMode === 'bottom10') {
        const sortedStates = Object.keys(foodInsecurityData && foodInsecurityData.length ? aggregateDataByState(foodInsecurityData, metric, year) : {})
            .sort((a, b) => aggregateDataByState(foodInsecurityData, metric, year)[b] - aggregateDataByState(foodInsecurityData, metric, year)[a]);
        statesToDisplay = (displayMode === 'top10')
            ? sortedStates.slice(0, 10)
            : sortedStates.slice(-10);
    } else {
        statesToDisplay = Object.keys(aggregateDataByState(foodInsecurityData, metric, year));
    }
    // asc or desc
    const aggData = aggregateDataByState(foodInsecurityData, metric, year);
    statesToDisplay.sort((a, b) => {
        const valA = aggData[a] || 0;
        const valB = aggData[b] || 0;
        return sortOrder === 'asc' ? valA - valB : valB - valA; //this was a nice puzzle it took me an annoying amount of time to figure out though
    });
    // colors
    const colors = Array(statesToDisplay.length).fill('#31688e');
    const borderColors = Array(statesToDisplay.length).fill('#33638DFF');
    // prep dataset
    const chartData = {
        labels: statesToDisplay.map(state => getStateName(state)),
        datasets: [{
            label: getMetricLabel(metric),
            data: statesToDisplay.map(state => aggData[state] || 0),
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    };
    let chartTitle = 'Food Insecurity Data';
    if (year !== 'all') chartTitle += ` (${year})`;
    if (interactiveChartInstance) interactiveChartInstance.destroy();
    interactiveChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: (displayMode === 'all') ? 'y' : 'x',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: chartTitle, font: { size: 16 } },
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: context => {
                            let label = context.dataset.label ? context.dataset.label + ': ' : '';
                            let value = context.raw;
                            if (metric !== 'cost' && value !== null) {
                                // percentage metrics: convert to percentage string
                                label += (value * 100).toFixed(1) + '%';
                            } else if (metric === 'cost' && value !== null) {
                                // cost metric: format as dollars
                                label += '$' + value.toFixed(2);
                            } else {
                                label += value;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: metric !== 'cost',
                    title: {
                        display: true,
                        text: (displayMode === 'all') ? 'States' : (metric === 'cost' ? 'Cost ($)' : 'Rate (%)')
                    },
                    ticks: {
                        callback: (value, index) => {
                            if (displayMode === 'all') {
                                return (metric !== 'cost')
                                    ? (value * 100).toFixed(1) + '%'
                                    : '$' + value.toFixed(2);
                            } else {
                                return chartData.labels[index];
                            }
                        }
                    }
                },
                y: {
                    beginAtZero: metric !== 'cost',
                    title: {
                        display: true,
                        text: (displayMode === 'all') ? 'States' : (metric === 'cost' ? 'Cost ($)' : 'Rate (%)')
                    },
                    ticks: {
                        callback: (value, index) => {
                            if (displayMode === 'all') {
                                return chartData.labels[index];
                            } else {
                                if (metric !== 'cost') {
                                    return (value * 100).toFixed(1) + '%';
                                }
                                return '$' + value.toFixed(2);
                            }
                        }
                    }
                }
            }
        }
    });
}

// intialize interactive chart; try and catch helped with debugging a lot
async function initializeInteractiveChart() {
    if (!document.getElementById('interactiveChart')) return Promise.resolve();
    try {
        foodInsecurityData = await loadCSVData();
        renderInteractiveChart();
    } catch (error) {
        console.error('couldnt initialize int.chart:', error);
    }
    return Promise.resolve();
}

// init visualizations on window load
window.addEventListener('load', () => {
    initializeInteractiveChart().then(() => {
        // make static charts after interactive
        renderStaticCharts();
    });
});

// update int.chart
document.getElementById('stateSelector')?.addEventListener('change', renderInteractiveChart);
document.getElementById('yearSelector')?.addEventListener('change', renderInteractiveChart);
document.getElementById('metricSelector')?.addEventListener('change', renderInteractiveChart);
document.getElementById('sortOrder')?.addEventListener('change', renderInteractiveChart);
document.getElementById('selectAllStates')?.addEventListener('click', () => {
    document.querySelectorAll('.state-checkbox').forEach(cb => cb.checked = true);
    renderInteractiveChart();
});
document.getElementById('deselectAllStates')?.addEventListener('click', () => {
    document.querySelectorAll('.state-checkbox').forEach(cb => cb.checked = false);
    renderInteractiveChart();
});



