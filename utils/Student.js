class Student {
	constructor(inSiteData, bedChart) {
		this.firstName = inSiteData.firstName;
		this.lastName = inSiteData.lastName;
		this.assignedHome = inSiteData.home;
		this.tempHome = bedChart.home || this.assignedHome;
		this.bed = bedChart.bedNumber;
		this.absenceCode = bedChart.abscenceCode || '';
		this.highRiskCode = bedChart.highRiskCode || '';
		this.imgUrl = inSiteData.imgUrl;
	}

	moveHome(home) {
		this.tempHome = home;
	}

	changeBed(num) {
		if (typeof num === 'number') this.bed = num;
	}

	addCode(abs, highRisk) {
		if (abs) this.absenceCode = abs;
		if (highRisk) this.highRiskCode = highRisk;

		if (homeList.includes(this.absenceCode)) {
			this.tempHome = this.absenceCode;
			if (this.tempHome !== this.assignedHome) this.moveHome(this.tempHome);
		}
	}
}
