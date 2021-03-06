import dotenv from 'dotenv'

dotenv.config()

import connect from './db.js'
import Nomination from '../models/Nomination.js'
import ExpertSheet from '../models/ExpertSheet.js'
import EvaluationCriterion from '../models/EvaluationCriterion.js'

const nominations = [
  { _id: '60ab9e75127f560de0da6242', name: 'научно-исследовательские и опытно-конструкторские работы, завершившиеся созданием и широким применением в производстве принципиально новых технологий, техники, приборов, оборудования, материалов и веществ' },
  { _id: '60b7369bd0f1f794f734a948', name: 'практическая реализация изобретений, открывающих новые направления в технике и технологиях' },
  { _id: '60b7369e2c899d6184d4e3e5', name: 'научно-исследовательские разработки, применяемые в области разведки, добычи и переработки полезных ископаемых' },
  { _id: '60b736a105a56d4ceb13b59c', name: 'высонозффективные научно-технические разработки, реализованные на практике в области производства, переработки и хранения сельскохозяйственной продукции' },
  { _id: '60b736a57b34eec4812e1a09', name: 'высокие результаты в исследованиях, разработке и прантическом применении новых методов и средств в медицине и здравоохранении' },
  { _id: '60b736a81a3ea84090d6e6b1', name: 'научные, проектно-нонструкторские и технологические достижения в области строительства, архитектуры и жилищно-коммунального хозяйства' },
  { _id: '60b736ac7eca05f61d5ec585', name: 'работы, являющиеся вкладом в решение проблем экологии и охраны природы' },
  { _id: '60b736af49c8fa6e4b1a920d', name: 'научно-исследовательские разработки, содействующие повышению эффективности реального сектора экономики' },
  { _id: '60ab9e75127f560de0da624a', name: 'исследования в области гуманитарных наук и права' }
]

const expertSheets = [
  { _id: '60b72de1d84b6907da1e51de', name: 'Характеристика работы' },
  { _id: '60b72dfdf7180de45724e53e', name: 'Оценка уровня научных достижений по работе' },
  { _id: '60b72e1640b0d055f53bed08', name: 'Оценка уровня готовности к внедрению' },
  { _id: '60b72e25eb68d0df9da03b48', name: 'Оценка уровня и квалификации исполнителей проекта' }
]

const evaluationCriteries = [
  // Характеристика работы
  { _id: '60b737aa3beb09120c101d33', number: '1.1', label: 'Актуальность работы для науки и практики', scores: '1-5', expertSheet: '60b72de1d84b6907da1e51de' },
  {
    _id: '60b737bc5ff7cfdd328f326f',
    number: '1.2',
    label: 'Научная новизна результатов',
    list: ['идея нова и востребована', 'идея известна, но не реализовна ранее', 'аналогичные разработки широко известны'],
    scores: '5, 3, 1',
    expertSheet: '60b72de1d84b6907da1e51de'
  },
  {
    _id: '60b737bfb2e87053e627cd77',
    number: '1.3',
    label: 'Масштабность заявленной проблемы',
    list: ['проблема важна для нескольких областей знаний', 'проблема важна для данной области знаний', 'проблема важна для отдельного направления науки'],
    scores: '5, 3, 1',
    expertSheet: '60b72de1d84b6907da1e51de'
  },
  {
    _id: '60b737c244f0256ee77e3e48',
    number: '1.4',
    label: 'Материалы, обобщенные в работе',
    list: ['комплексное исследование научной школы', 'диссертационные материалы', 'инициативные исследования'],
    scores: '5, 3, 1',
    expertSheet: '60b72de1d84b6907da1e51de'
  },
  {
    _id: '60b737c780e35c31a4a39dba',
    number: '1.5',
    label: 'Оригинальность предложенных решений',
    list: ['разработаны впервые', 'получены путем совершенствования уже известных решений', 'традиционны'],
    scores: '5, 3, 1',
    expertSheet: '60b72de1d84b6907da1e51de'
  },
  {
    _id: '60b737cb35055ddaf908d2cd',
    number: '1.6',
    label: 'Готовность к внедрению',
    list: ['готов к внедрению', 'не готов к внедрению'],
    scores: '3, 1',
    expertSheet: '60b72de1d84b6907da1e51de'
  },
  // Оценка уровня научных достижений по работе
  { _id: '60b73756264b179d2f1f6cb0', number: '2.1', label: 'В журналах ВАК', scores: '1 статья — 10 баллов', expertSheet: '60b72dfdf7180de45724e53e' },
  { _id: '60b7375ab2e4333e0927b53a', number: '2.2', label: 'В изданиях другого уровня (статьи, без учета тезисов)', scores: '1 статья — 1 балл', expertSheet: '60b72dfdf7180de45724e53e' },
  { _id: '60b7375d1865b5ff05f45a45', number: '2.3', label: 'Монографии', scores: '1 изд. — 20 баллов', expertSheet: '60b72dfdf7180de45724e53e' },
  { _id: '60b73760d2e09e28d839d8cd', number: '2.4', label: 'Публикации в научных журналах, индексируемых в базе Scopus и Web of Science', scores: '1 статья — 20 баллов', expertSheet: '60b72dfdf7180de45724e53e' },
  // Оценка уровня готовности к внедрению
  { _id: '60b73763c91855fee0acc433', number: '3.1', label: 'Акты внедрения (к учету принимаются документы, имеющие печать, заверенные подписи и утвержденные руководителем организации', scores: '1 акт внедрения — 2 балла', expertSheet: '60b72e1640b0d055f53bed08' },
  { _id: '60b73766aafa8d3809d9a985', number: '3.2', label: 'Патенты, изобретения, полезные модели', scores: '1 патент и др. — 10 баллов', expertSheet: '60b72e1640b0d055f53bed08' },
  { _id: '60b7376aaa23e24fe9c5b882', number: '3.3', label: 'Наличие сертификатов (для продукции)', scores: '3 балла за каждый', expertSheet: '60b72e1640b0d055f53bed08' },
  { _id: '60b7376d965b0294c90429c7', number: '3.4', label: 'Наличие собственной базы (лаборатории, оснащения) для реализации проекта', scores: 'Да — 10, нет — 0', expertSheet: '60b72e1640b0d055f53bed08' },
  // Оценка уровня и квалификации исполнителей проекта
  { _id: '60b73770507392c6daa02908', number: '4.1', label: 'Доктора наук', scores: '6 баллов за каждого', expertSheet: '60b72e25eb68d0df9da03b48' },
  { _id: '60b737736e14ac993c30ce9c', number: '4.2', label: 'Кандидаты наук', scores: '3 балла за каждого', expertSheet: '60b72e25eb68d0df9da03b48' },
  { _id: '60b73776640ff75c487aa9a5', number: '4.3', label: 'Научная репутация и компетентность (почетные звания, награды федерального уровня: з.д.н. РФ, з.р.в.ш. РФ и т.д.) при наличии их подтверждения', scores: '5 баллов за каждого', expertSheet: '60b72e25eb68d0df9da03b48' },
  { _id: '60b7377a6096e5f23e9e1262', number: '4.4', label: 'Дополнительные баллы — выставляются экспертом и подлежат письменному обоснованию (отзыв до 1 страницы)', scores: '5', expertSheet: '60b72e25eb68d0df9da03b48' },
]

connect(process.env.MONGO_URI)
  .then(async () => {
    await Nomination.deleteMany()
    await ExpertSheet.deleteMany()
    await EvaluationCriterion.deleteMany()

    await Nomination.insertMany(nominations)
    await ExpertSheet.insertMany(expertSheets)
    await EvaluationCriterion.insertMany(evaluationCriteries)

    console.log('Inserted')
  })
  .catch(e => console.log(e))
  .finally(() => process.exit(0))