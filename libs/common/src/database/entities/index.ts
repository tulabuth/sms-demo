import { CgBlacklists } from '@app/common/entities/CgBlacklists';
import { CgCampaigns } from '@app/common/entities/CgCampaigns';
import { CgCampaignsLists } from '@app/common/entities/CgCampaignsLists';
import { CgCampaignsRecipients } from '@app/common/entities/CgCampaignsRecipients';
import { CgCampaignsSenderids } from '@app/common/entities/CgCampaignsSenderids';
import { CgCampaignsSendingServers } from '@app/common/entities/CgCampaignsSendingServers';
import { CgChatBoxMessages } from '@app/common/entities/CgChatBoxMessages';
import { CgChatBoxes } from '@app/common/entities/CgChatBoxes';
import { CgContactGroups } from '@app/common/entities/CgContactGroups';
import { CgContactGroupsOptinKeywords } from '@app/common/entities/CgContactGroupsOptinKeywords';
import { CgContactGroupsOptoutKeywords } from '@app/common/entities/CgContactGroupsOptoutKeywords';
import { CgContacts } from '@app/common/entities/CgContacts';
import { CgContactsCustomField } from '@app/common/entities/CgContactsCustomField';
import { CgCountries } from '@app/common/entities/CgCountries';
import { CgCurrencies } from '@app/common/entities/CgCurrencies';
import { CgCustomSendingServers } from '@app/common/entities/CgCustomSendingServers';
import { CgCustomers } from '@app/common/entities/CgCustomers';
import { CgEmailTemplates } from '@app/common/entities/CgEmailTemplates';
import { CgInvoices } from '@app/common/entities/CgInvoices';
import { CgKeywords } from '@app/common/entities/CgKeywords';
import { CgNotifications } from '@app/common/entities/CgNotifications';
import { CgPaymentMethods } from '@app/common/entities/CgPaymentMethods';
import { CgPermissions } from '@app/common/entities/CgPermissions';
import { CgPhoneNumbers } from '@app/common/entities/CgPhoneNumbers';
import { CgPlans } from '@app/common/entities/CgPlans';
import { CgPlansCoverageCountries } from '@app/common/entities/CgPlansCoverageCountries';
import { CgPlansSendingServers } from '@app/common/entities/CgPlansSendingServers';
import { CgReports } from '@app/common/entities/CgReports';
import { CgRoles } from '@app/common/entities/CgRoles';
import { CgSenderid } from '@app/common/entities/CgSenderid';
import { CgSenderidPlans } from '@app/common/entities/CgSenderidPlans';
import { CgSendingServers } from '@app/common/entities/CgSendingServers';
import { CgSpamWord } from '@app/common/entities/CgSpamWord';
import { CgSubscriptionLogs } from '@app/common/entities/CgSubscriptionLogs';
import { CgSubscriptionTransactions } from '@app/common/entities/CgSubscriptionTransactions';
import { CgSubscriptions } from '@app/common/entities/CgSubscriptions';
import { CgTemplateTags } from '@app/common/entities/CgTemplateTags';
import { CgTemplates } from '@app/common/entities/CgTemplates';
import { CgTrackingLogs } from '@app/common/entities/CgTrackingLogs';
import { CgUsers } from '@app/common/entities/CgUsers';
import { CreditLog } from '@app/common/entities/credit_log.entity';

export default [
  CgReports,
  CgCampaigns,
  CgUsers,
  CgBlacklists,
  CgChatBoxes,
  CgChatBoxMessages,
  CgSendingServers,
  CgCampaignsSendingServers,
  CgCustomers,
  CgCustomSendingServers,
  CgContacts,
  CgContactGroups,
  CgContactsCustomField,
  CgTrackingLogs,
  CgCampaignsLists,
  CgContactGroupsOptinKeywords,
  CgContactGroupsOptoutKeywords,
  CgSpamWord,
  CgPlans,
  CgPlansSendingServers,
  CgCurrencies,
  CgInvoices,
  CgPaymentMethods,
  CgSubscriptions,
  CgSubscriptionLogs,
  CgSubscriptionTransactions,
  CgKeywords,
  CgPhoneNumbers,
  CgSendingServers,
  CgSenderid,
  CgSenderidPlans,
  CgPlansCoverageCountries,
  CgCountries,
  CgNotifications,
  CgRoles,
  CgPermissions,
  CgTemplates,
  CgTemplateTags,
  CgEmailTemplates,
  CgCampaignsRecipients,
  CgCampaignsSenderids,
  CreditLog,
];
