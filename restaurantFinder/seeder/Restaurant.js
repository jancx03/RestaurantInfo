/* eslint-disable class-methods-use-this */
export default class Restaurant {
  constructor(info) {
    this.name = info.name;
    this.rating = info.rating ?? this.getRating();
    this.cost = info.cost ?? this.getCost();
    this.type = info.type ?? this.getType();
    this.sanitary = info.sanitary ?? this.getSanitary();
    this.payMethod = info.payMethod ?? this.getPayMethod();
    this.address = info.address;
    this.contact = info.contact ?? 'none';
    this.accessibility = info.accessibility ?? this.getAccessibility();
    this.kidFriendly = info.kidFriendly ?? this.getKidFriendly();
    this.popularFood = info.popularFood ?? 'none';
    this.waitTime = info.waitTime ?? `${this.getRandom(99)} minutes`;
    this.reserve = info.reserve ?? this.getReserve();
    this.serviceMethod = info.serviceMethod ?? this.getServiceMethod();
    this.url = info.url;
    this.lat = info.lat;
    this.lng = info.lng;
    this.alias = info.alias;
  }

  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  getRating() {
    return this.getRandom(5) + 1;
  }

  getCost() {
    const costs = [
      '$$$',
      '$$',
      '$',
    ];

    const index = this.getRandom(costs.length);
    return costs[index];
  }

  getType() {
    const types = [
      'Chinese',
      'Japanese',
      'Mexican',
      'American',
      'French',
      'Italian',
    ];

    const index = this.getRandom(types.length);

    return types[index];
  }

  getSanitary() {
    const ratings = [
      'A',
      'B',
      'C',
    ];

    const index = this.getRandom(ratings.length);

    return ratings[index];
  }

  getPayMethod() {
    const methods = [
      'Cash',
      'Credit',
      'Both',
    ];

    const index = this.getRandom(methods.length);

    return methods[index];
  }

  getKidFriendly() {
    const responses = [
      'Yes',
      'No',
    ];

    const index = this.getRandom(responses.length);

    return responses[index];
  }

  getReserve() {
    const responses = [
      'Yes',
      'No',
    ];

    const index = this.getRandom(responses.length);

    return responses[index];
  }

  getAccessibility() {
    const values = [
      'Yes',
      'No',
    ];

    const index = this.getRandom(values.length);

    return values[index];
  }

  getServiceMethod() {
    const values = [
      'Waiter service',
      'Casual',
      'Fast food',
      'Café',
    ];

    const index = this.getRandom(values.length);

    return values[index];
  }
}
