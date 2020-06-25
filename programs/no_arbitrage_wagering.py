import numpy as np

# Common notations:
# n -- the number of forecasters
#
#
# m -- the number of all possible outcomes of an event
#
#
# forecasts -- forecasts matrix for a particular event, where 
#              each row is a single forecaster, each column
#              is one of all potential outcomes of a event and
#              each element is a probability prediction made 
#              by a forecaster on a potential outcome.
# example for forecasts: 
#     Suppose an event have three possible outcomes: o1, o2
#     and o3. Forecaster 1 predicted that o1, o2, o3 would 
#     happen with probabilities 0.2, 0.3, 0.5 respectively.
#     Forecaster 2 predicted that o1, o2, o3 would happen with
#     probabilities 0.8, 0.1, 0.1. Then, 
#     forecasts = np.array([[0.2, 0.3, 0.5],
#                           [0.8, 0.1, 0.1]])
#
#
# wagers -- wager vector for a particular event, where each
#           element is the wager of a forecaster allocated on
#           this particular event.
# example for wagers:
#     Suppose forecaster 1 wagerred 3.0 unit of money on this 
#     event, and forecaster 2 wagerred 1.0 unit of monet on 
#     this event. Then,
#     wagers = np.array([3.0, 1.0])

def Brier_score(forecasts, b=1, a=-0.5):
    # Usage: this function computes the Brier score used by 
    #        the no-arbitrage wagering mechanism. 
    #
    # Inputs: 
    # forecasts -- forecasts matrix for a particular event
    # b, a -- Brier Score scale parameters
    #
    #
    # Return: a matrix of Brier scores of size (n, m), 
    #         where the element in position [i, j] is the 
    #         Brier score of forecaster i when outcome j was
    #         realized.
    #
    # Note: the Brier score in position [i,j] is calculated 
    #       as 1 - 0.5 * ((1 - forecasts[i, j])^2 
    #                      + sum(forecast[i, k]^2) for all k 
    #                        that k!= j).
    #
    # Example: suppose forecasts = np.array([[0.2, 0.3, 0.5],
    #                                        [0.8, 0.1, 0.1]])
    #          the return value, i.e., the Brier score matrix
    #          is np.array([[0.51, 0.61, 0.81]
    #                       [0.97, 0.27, 0.27]])

    return b + a * (1 - 2 * forecasts + np.sum(forecasts**2, axis=1)[:, None])

def f_norm_Brier_subgradient(forecasts, weights):
    # Usage: aggregate forecasts of multiple forecasters into
    #        one forecast over all possible outcomes, using 
    #        a transformed weighted average method. This 
    #        aggregated forecast is called in NAWM. 
    #
    # Input:
    # forecasts -- forecasts matrix containing forecasts of 
    #              multiple forecasters
    # weights -- weights in the NAMW of multiple forecasters 
    #
    # Return: the aggregated forecast vector
    #
    # Example: suppose the forecasts of two forecasters are
    #          forecasts = np.array([[0.2, 0.3, 0.5],
    #                                [0.8, 0.1, 0.1]])
    #          and the weights are np.array([0.0, 3.0]).
    #          return an aggregated forecast:
    #                      np.array([0.8, 0.1, 0.1])

    return (1 + 2 * np.average((2 * forecasts - 1) / 2, weights=weights, axis=0)) / 2


def no_arbitrage_wagering(forecasts, wagers, f_norm=f_norm_Brier_subgradient):
    # Usage: this function computes the net payoff of each 
    #        forecaster under every possible outcome of an 
    #        event using no arbitrage wagering mechanism given
    #        their forecasts.
    #
    # Inputs: 
    # forecasts -- forecasts matrix for a particular event
    # wagers -- wager vector for a particular event
    # f_norm -- a mechanism parameter
    #
    # Return: a NET payoff matrix of size (n, m), where the 
    #         element in position [i, j] is net payoff of 
    #         forecaster i when outcome j was realized. For a 
    #         particular forecaster, its FINAL payoff should be
    #         the sum of its net payoff plus its wager. 
    #
    # Example: suppose the forecasts of two forecasters are
    #          forecasts = np.array([[0.2, 0.3, 0.5],
    #                                [0.8, 0.1, 0.1]])
    #          and their wagers are np.array([3.0, 1.0]).
    #          The RETURN of this function is 
    #          np.array([[-0.345, 0.255, 0.405],
    #                    [0.345, -0.255, -0.405]]).
    #          The first row is the net payoff for forecaster 
    #          1 under three different outcomes, and the second 
    #          row is the net payoff for forecaster 2. Their 
    #          final payoffs are
    #          np.array([[-2.655, 3.255, 3.405],
    #                    [1.345, 0.745, 0.595]])

    n, m = np.shape(forecasts)
    w = wagers
    sum_w = np.sum(w)
    coefficient = np.multiply(w, sum_w - w) / sum_w
    forecast_bar = np.zeros((n,m))
    for i in range(n):
        w_zero_i = np.array(w)
        w_zero_i[i] = 0
        forecast_bar[i, :] = f_norm(forecasts, w_zero_i)
    scores = (Brier_score(forecasts) - Brier_score(forecast_bar))
    return coefficient[:, None] * scores



