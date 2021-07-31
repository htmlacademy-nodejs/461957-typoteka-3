function getAuthHeader(token: string): Record<string, Record<string, string>> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return {headers};
}

export {getAuthHeader};
