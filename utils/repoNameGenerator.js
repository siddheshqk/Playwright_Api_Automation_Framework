function generateRepoName(testId) {

  const now = new Date();

  return `dummy-${testId}-${now.getFullYear()
    }${String(now.getMonth() + 1).padStart(2, "0")
    }${String(now.getDate()).padStart(2, "0")
    }-${Date.now().toString().slice(-5)
    }`;
}

module.exports = { generateRepoName };
