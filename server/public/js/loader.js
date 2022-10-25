const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.initiatorType === "fetch") {
      document.querySelector(".spinner").style.display = "none";
    }
  }
});

observer.observe({
  entryTypes: ["resource"],
});
