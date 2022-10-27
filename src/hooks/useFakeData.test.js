import { renderHook, act, waitFor } from '@testing-library/react';
import useFakeData, { IDLE_STATUS, FINISHED_STATUS } from './useFakeData';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockURL = 'users.json';
const mockName = 'pturner';
const mockResponse = {
  users: [
    {
      username: 'pturner0',
      avatar_url:
        'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
      name: 'Paula Turner'
    },
    {
      username: 'pdixon1',
      avatar_url:
        'https://secure.gravatar.com/avatar/be09ed96613495dccda4eeffc4dd2daf?d=mm',
      name: 'Patrick Dixon'
    }
  ]
};
const server = setupServer(
  rest.get(mockURL, (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  })
);

describe('useFakeData hook', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should exist', () => {
    const { result } = renderHook(() => useFakeData());
    expect(result.current).toBeDefined();
  });

  it('should return an IDLE status when no parameter is given', () => {
    const { result } = renderHook(() => useFakeData());
    expect(result.current.status).toEqual(IDLE_STATUS);
  });

  it('should return FINISHED status when query is set', async () => {
    const { result } = renderHook(() => useFakeData());
    act(() => {
      result.current.setQuery(mockName);
    });

    await waitFor(() => expect(result.current.status).toEqual(FINISHED_STATUS));
  });

  it('should return data', async () => {
    const { result } = renderHook(() => useFakeData());
    act(() => {
      result.current.setQuery(mockName);
    });

    await waitFor(() => expect(result.current.data.length).toBeGreaterThan(0));
  });

  it('should return user "pturner0" data', async () => {
    const { result } = renderHook(() => useFakeData());
    act(() => {
      result.current.setQuery(mockName);
    });

    await waitFor(() =>
      expect(result.current.data[0].username).toEqual('pturner0')
    );
  });
});
