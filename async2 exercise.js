// task 1: declare the task array and interval id
let oneTimeTasks = [];
let monitoringTaskId;

// task 2 Add onetime task function
function addOneTimeTask(func, delay) {
  oneTimeTasks.push({ func: func, delay: delay });
}

// task 3: run onetime tasks
function runOneTimeTasks() {
  oneTimeTasks.forEach(function (task) {
    setTimeout(task.func, task.delay);
  });
}

// task 4 start monitoring 
function startMonitoring() {
  monitoringTaskId = setInterval(function () {
    console.log("[Monitoring] Systems are stable.");
  }, 2000); // every 2 seconds
}

// task 5 stop monitoring
function stopMonitoring() {
  clearInterval(monitoringTaskId);
  console.log("[Monitoring] Stopped continuous monitoring.");
}

// task 6: start countdown
function startCountdown(duration) {
  let countdown = duration;
  const countdownId = setInterval(function () {
    if (countdown > 0) {
      console.log("T-minus " + countdown + " seconds");
      countdown--;
    } else {
      clearInterval(countdownId);
      console.log("Liftoff!");
    }
  }, 1000); // once per second
}

// task 7: schedule mission steps
function scheduleMission() {
  // add system checks
  addOneTimeTask(function () {
    console.log("[System Check] Engines ready.");
  }, 1000);

  addOneTimeTask(function () {
    console.log("[System Check] Navigation systems online.");
  }, 2000);

  addOneTimeTask(function () {
    console.log("[System Check] Communications green.");
  }, 3000);

  runOneTimeTasks();

  setTimeout(function () {
    console.log("[Monitoring] Starting continuous system monitoring...");
    startMonitoring();
  }, 4000);

  setTimeout(function () {
    stopMonitoring();
  }, 9000);

  setTimeout(function () {
    console.log("Initiating final countdown...");
    startCountdown(5);
  }, 10000);
}

scheduleMission();
