export const getAllCribs = () => {
  const query = `*[_type =='crib']`;
  return query;
};

export const getCribDetail = (cribId: string | string[]) => {
  const query = `*[_type =='crib'&& _id=='${cribId}']
  {_id, caption,video{
    asset->{
      _id,url}
    }, cribId,
    author->{
      _id,profileName, image},
      likes,
      reviews[]{
        review,
        _key,
        author->
        {_ref,_id}}
}`;
  return query;
};

export const searchCribParam = (searchParam: string | string[]) => {
  const query = `*[_type =='crib'&& _id=='${searchParam}']
  {_id, caption,video{
    asset->{
      _id,url}
    }, cribId,
    author->{
      _id,profileName, image},
      likes,
      reviews[]{
        review,
        _key,
        author->
        {_ref,_id}}
}`;
  return query;
};

export const getAllProfiles = () => {
  const query = `*[_type =='profile']`;
  return query;
};
export const getLoneProfile = (profileId: string | string[]) => {
  const query = `*[_type =='profile'&& _id=='${profileId}']`;

  return query;
};
export const getProfileMadeCrib = (profileId: string | string[]) => {
  const query = `*[_type =='crib'&& profileId =='${profileId}'] | order(_createdAt desc)
    {_id, caption,video{
      asset->{
        _id,url}
      }, cribId,
      author->{
        _id,profileName, image},
        likes,
        reviews[]{
          review,
          _key,
          author->
          {_ref,_id}}
  
  }`;

  return query;
};

export const getProfileLikedCrib = (profileId: string | string[]) => {
  const query = `*[_type =='crib'&& '${profileId}' in likes[]._ref] | order (_createdAt desc){_id, caption,video{
    asset->{
      _id,url}
    }, cribId,
    author->{
      _id,profileName, image},
      likes,
      reviews[]{
        review,
        _key,
        author->
        {_ref,_id}}
}`;

  return query;
};
export const getNichedCrib = (niche: string | string[]) => {
  const query = `*[_type =='crib'&& niche match '${niche}']{_id, caption,video{
    asset->{
      _id,url}
    }, cribId,
    author->{
      _id,profileName, image},
      likes,
      reviews[]{
        review,
        _key,
        author->
        {_ref,_id}}
}`;

  return query;
};
// |order(_createdAt desc){_id,caption,description,video{asset -> {_id,url}}, profileId,author ->{_id,profileName,image},likes,reviews[{review,_key,author->{_id,profileName,image},images}]}

// test end point route
export const findParam = (findInput: string | string[]) => {
  const query = `*[_type =='crib'&& caption match'${findInput}*' || niche match'${findInput}*' ]
  {_id, caption,description,video{
    asset->{
      _id,url}
    }, profileId,
    author->{
      _id,profileName, image},
      likes,
      reviews[]{
        review,
        _key,
        author->
        {_id, profileName, image}}
}`;
  return query;
};
