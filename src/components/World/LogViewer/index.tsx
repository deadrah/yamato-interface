import { useWeb3React } from '@web3-react/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { LOG_EVENT_NAME } from '../../../constants/yamato';
import useENSName from '../../../hooks/ens/useENSName';
import { useYamatoStateForWorld } from '../../../state/yamato-entirety/hooks';
import { LogEvent, LogEventType } from '../../../state/yamato-entirety/reducer';
import { shortenAddress } from '../../../utils/web3';
import { Text } from '../../CommonItem';

function getDescriptor(event: LogEvent) {
  switch (event.category as LogEventType) {
    case 'deposit':
      return `${event.value}ETHを預けました！`;
    case 'withdrawal':
      return `${event.value}ETHを引き出しました！`;
    case 'borrowing':
      return `${event.value}CJPYを借り入れました！`;
    case 'repay':
      return `${event.value}CJPYを返済しました！`;
    case 'self_redemption':
      return `${event.value}CJPYを償還しました！`;
    case 'core_redemption':
      return `トリガーしました！`;
    case 'sweep':
      return `トリガーしました！`;
    default:
      return `${event.value}を行いました！`;
  }
}

function getColor(category: LogEventType) {
  switch (category) {
    case 'deposit':
      return `red`;
    case 'withdrawal':
      return `red`;
    case 'borrowing':
      return `green`;
    case 'repay':
      return `green`;
    case 'self_redemption':
      return `blue`;
    case 'core_redemption':
      return `blue`;
    case 'sweep':
      return `blue`;
    default:
      return `black`;
  }
}

const Animation = styled.div`
  transition: opacity 0.5s;

  // enter from
  &.fade-enter {
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
  }

  // exit from
  &.fade-exit {
    opacity: 1;
  }

  // exit to
  &.fade-exit-active {
    opacity: 0;
  }
`;

export default function LogViewer() {
  const { account } = useWeb3React();
  const { events } = useYamatoStateForWorld();
  const { ENSName } = useENSName(account ?? undefined);
  const diplayedEvents = events.slice(0, 20);

  function renderLogEvents() {
    return diplayedEvents.map((event) => {
      const title = LOG_EVENT_NAME[event.category as LogEventType];
      const color = getColor(event.category as LogEventType);
      const descriptor = getDescriptor(event);
      return (
        <CSSTransition key={event.id} timeout={500} classNames="fade">
          <Animation>
            <Text
              key={event.id}
              style={{
                display: 'block',
              }}
            >
              <span style={{ color, fontWeight: 'bold' }}>{title}</span>
              <span>: {ENSName ?? shortenAddress(event.address)}が</span>
              <span>{descriptor}</span>
            </Text>
          </Animation>
        </CSSTransition>
      );
    });
  }

  return (
    <div
      style={{ height: !!account ? '30rem' : '34.5rem', overflowY: 'scroll' }}
    >
      <TransitionGroup>{renderLogEvents()}</TransitionGroup>
      {renderLogEvents()}
    </div>
  );
}
