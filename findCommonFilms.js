function find_common_films(character_ids){
  const urls = [];
  character_ids.forEach(id => {
      urls.push(`https://swapi.dev/api/people/${id}/.json`);
  });

  const allRequests = urls.map(url =>
      fetch(url).then(response => response.json())
  );
  
  Promise.all(allRequests).then((arrayOfResponses) => {
    const allFilms = {}
    for(let record of arrayOfResponses){
      for(let filmUrl of record.films){
        allFilms[filmUrl] = allFilms[filmUrl] + 1 || 1
      }
    }
      
    const filteredFilms = []
    for(let filmUrl in allFilms){
      if(allFilms[filmUrl] === character_ids.length){
        filteredFilms.push(filmUrl)
      }
    }

    if(!filteredFilms.length){
      console.log('No common films')
    } else {
      console.log(filteredFilms)
    }
  }).catch(error => console.log('There was an error: ' + error))
}
